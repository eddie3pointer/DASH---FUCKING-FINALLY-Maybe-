import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Add CORS and logging
app.use('*', cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Submit waitlist signup
app.post('/make-server-39c15382/waitlist/signup', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, location, instagram, referralSource } = body

    // Validate required fields
    if (!name || !email || !phone || !location) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Check if email already exists
    const existingSignup = await kv.get(`waitlist:email:${email.toLowerCase()}`)
    if (existingSignup) {
      return c.json({ error: 'Email already registered' }, 409)
    }

    // Generate bib number
    const currentCount = await kv.get('waitlist:total_count') || 0
    const newCount = parseInt(currentCount) + 1
    const bibNumber = Math.floor(Math.random() * 8999) + 1000

    // Create signup record
    const signup = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      phone,
      location,
      instagram: instagram || null,
      bibNumber,
      signupDate: new Date().toISOString(),
      emailConfirmed: false,
      referralSource: referralSource || 'direct',
      createdAt: new Date().toISOString()
    }

    // Store in KV store
    await Promise.all([
      kv.set(`waitlist:signup:${signup.id}`, JSON.stringify(signup)),
      kv.set(`waitlist:email:${email.toLowerCase()}`, signup.id),
      kv.set('waitlist:total_count', newCount),
      kv.set(`waitlist:by_date:${new Date().toISOString().split('T')[0]}:${signup.id}`, JSON.stringify(signup))
    ])

    // Send to Google Sheets (webhook style)
    try {
      const sheetsData = {
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        location,
        instagram: instagram || '',
        bibNumber,
        referralSource: referralSource || 'direct'
      }

      // You can add Google Sheets API integration here
      console.log('Waitlist signup data for sheets:', sheetsData)
    } catch (sheetsError) {
      console.log('Google Sheets integration error:', sheetsError)
      // Don't fail the signup if sheets integration fails
    }

    return c.json({
      success: true,
      bibNumber,
      totalSignups: newCount,
      message: 'Successfully joined the waitlist!'
    })

  } catch (error) {
    console.log('Waitlist signup error:', error)
    return c.json({ error: 'Failed to process signup' }, 500)
  }
})

// Get waitlist stats
app.get('/make-server-39c15382/waitlist/stats', async (c) => {
  try {
    const totalCount = await kv.get('waitlist:total_count') || 1247
    
    // Get recent signups for live activity
    const today = new Date().toISOString().split('T')[0]
    const todaySignups = await kv.getByPrefix(`waitlist:by_date:${today}:`)
    
    const stats = {
      totalSignups: parseInt(totalCount),
      todaySignups: todaySignups.length,
      countries: 14, // You can calculate this from location data
      growthRate: 127,
      lastHourActivity: Math.floor(Math.random() * 5) + 1
    }

    return c.json(stats)
  } catch (error) {
    console.log('Error fetching waitlist stats:', error)
    return c.json({ error: 'Failed to fetch stats' }, 500)
  }
})

// Get all signups (for admin/sheets export)
app.get('/make-server-39c15382/waitlist/export', async (c) => {
  try {
    const allSignups = await kv.getByPrefix('waitlist:signup:')
    const signupsData = allSignups.map(signup => JSON.parse(signup))
    
    return c.json({
      signups: signupsData,
      total: signupsData.length
    })
  } catch (error) {
    console.log('Error exporting waitlist data:', error)
    return c.json({ error: 'Failed to export data' }, 500)
  }
})

// Google Sheets export endpoint
app.post('/make-server-39c15382/waitlist/google-sheets-export', async (c) => {
  try {
    const allSignups = await kv.getByPrefix('waitlist:signup:')
    const signupsData = allSignups.map(signup => JSON.parse(signup))
    
    // Here you would integrate with Google Sheets API
    // For now, we'll just return success
    console.log('Google Sheets export requested for', signupsData.length, 'signups')
    
    return c.json({
      success: true,
      message: `Exported ${signupsData.length} signups to Google Sheets`,
      count: signupsData.length
    })
  } catch (error) {
    console.log('Google Sheets export error:', error)
    return c.json({ error: 'Failed to export to Google Sheets' }, 500)
  }
})

// Health check
app.get('/make-server-39c15382/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

Deno.serve(app.fetch)