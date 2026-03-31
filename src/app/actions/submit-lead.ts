'use server';

import { supabase } from '@/lib/supabase';
import { PROJECT_DATA } from '@/config/project-data';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type SubmitLeadResult = {
  success: boolean;
  error?: string;
};

export async function submitLead(formData: FormData): Promise<SubmitLeadResult> {
  const name = (formData.get('name') as string).trim();
  const phone = (formData.get('phone') as string).trim();
  const unit = formData.get('unit_configuration') as string;
  const email = (formData.get('email') as string | null)?.trim() || 'Not Provided'; 
  const currentProject = PROJECT_DATA.projectName.trim();

  // The specific message you requested
  const duplicateErrorMessage = "We have already received your enquiry. Our Sales Person will call you soon";

  try {
    // 1. PRE-CHECK: Fast check to see if lead exists for this specific project
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('phone_number', phone)
      .eq('project_name', currentProject)
      .maybeSingle();

    if (existingLead) {
      return { 
        success: false, 
        error: duplicateErrorMessage 
      };
    }

    // 2. INSERT: Database composite unique key (phone_number, project_name) acts as the final safety net
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ 
          full_name: name, 
          phone_number: phone, 
          email_address: email,
          unit_configuration: unit,
          project_name: currentProject,
          source: 'Landing Page'
      }]);

    if (dbError) {
      // 23505 = Postgres Unique Violation code
      if (dbError.code === '23505') {
        return { 
          success: false, 
          error: duplicateErrorMessage 
        };
      }
      console.error('DB Error:', dbError);
      return { success: false, error: 'Failed to submit enquiry. Please try again.' };
    }

    // 3. EMAIL: Only triggers if the lead is successfully saved (no duplicates)
    await resend.emails.send({
      from: 'Lead Engine <onboarding@resend.dev>',
      to: [PROJECT_DATA.contact.email],
      subject: `✨ New Lead: ${currentProject} - ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #c5a059;">New Project Inquiry</h2>
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 6px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Requirement:</strong> ${unit}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project:</strong> ${currentProject}</p>
          </div>
        </div>
      `,
    });

    return { success: true };

  } catch (err) {
    console.error('System Error:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}