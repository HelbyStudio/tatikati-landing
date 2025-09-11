import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse JSON with error handling
    let data;
    try {
      data = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return new Response(
        JSON.stringify({ error: 'Format de requête invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { email } = data;

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment (injected by Railway)
    const apiKey = import.meta.env.BREVO_API_KEY;
    
    if (!apiKey) {
      console.error('BREVO_API_KEY not configured');
      // Still return success to avoid exposing configuration issues
      return new Response(
        JSON.stringify({ success: true, message: 'Inscription enregistrée' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create contact in Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          SOURCE: 'tatikati-landing',
          SIGNUP_DATE: new Date().toISOString()
        },
        updateEnabled: true // Update if contact already exists
      })
    });

    // Check if contact was created or updated
    if (brevoResponse.status === 201 || brevoResponse.status === 204) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Inscription réussie !' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Handle Brevo API errors
    const errorData = await brevoResponse.json().catch(() => ({}));
    
    // If contact already exists, still consider it a success
    if (errorData.code === 'duplicate_parameter') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Vous êtes déjà inscrit !' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.error('Brevo API error:', errorData);
    
    return new Response(
      JSON.stringify({ 
        error: 'Une erreur est survenue. Veuillez réessayer.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Une erreur est survenue. Veuillez réessayer.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};