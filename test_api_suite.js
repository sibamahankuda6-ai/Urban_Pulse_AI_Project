// Comprehensive API & Security Integration Test Suite for Urban Pulse AI
const BASE_URL = 'http://localhost:8080/api';

let adminToken = '';
let workerToken = '';
let userToken = '';
let newCitizenToken = '';
let createdComplaintId = null;

const results = [];

function recordResult(testName, passed, details) {
  results.push({ testName, passed, details });
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | ${testName} | ${details}`);
}

async function runTests() {
  console.log('====================================================');
  console.log('   URBAN PULSE AI — FULL INTEGRATION TEST SUITE     ');
  console.log('====================================================\n');

  // 1. PUBLIC ENDPOINTS
  try {
    const res = await fetch(`${BASE_URL}/analytics/dashboard`);
    const data = await res.json();
    recordResult(
      'Public Analytics Dashboard',
      res.status === 200 && data.totalComplaints !== undefined,
      `Status: ${res.status}, Total Complaints: ${data.totalComplaints}`
    );
  } catch (err) {
    recordResult('Public Analytics Dashboard', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/complaints`);
    const data = await res.json();
    recordResult(
      'Public Complaints Retrieval',
      res.status === 200 && Array.isArray(data),
      `Status: ${res.status}, Complaints Count: ${data.length}`
    );
  } catch (err) {
    recordResult('Public Complaints Retrieval', false, err.message);
  }

  // 2. AUTHENTICATION & LOGIN
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gmail.com', password: 'wrongpassword' }),
    });
    recordResult(
      'Login Rejects Incorrect Password',
      res.status === 401,
      `Status: ${res.status}`
    );
  } catch (err) {
    recordResult('Login Rejects Incorrect Password', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gmail.com', password: '12345' }),
    });
    const data = await res.json();
    adminToken = data.token;
    recordResult(
      'Admin Login & JWT Token Issuance',
      res.status === 200 && !!adminToken && data.role === 'ADMIN',
      `Status: ${res.status}, Role: ${data.role}, Token Length: ${adminToken ? adminToken.length : 0}`
    );
  } catch (err) {
    recordResult('Admin Login & JWT Token Issuance', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'worker@gmail.com', password: '12345' }),
    });
    const data = await res.json();
    workerToken = data.token;
    recordResult(
      'Worker Login & JWT Token Issuance',
      res.status === 200 && !!workerToken && (data.role === 'WORKER' || data.role === 'DEPARTMENT'),
      `Status: ${res.status}, Role: ${data.role}`
    );
  } catch (err) {
    recordResult('Worker Login & JWT Token Issuance', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@gmail.com', password: '12345' }),
    });
    const data = await res.json();
    userToken = data.token;
    recordResult(
      'User Login & JWT Token Issuance',
      res.status === 200 && !!userToken && data.role === 'USER',
      `Status: ${res.status}, Role: ${data.role}`
    );
  } catch (err) {
    recordResult('User Login & JWT Token Issuance', false, err.message);
  }

  // 3. REGISTRATION
  const testEmail = `citizen_${Date.now()}@example.com`;
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Citizen',
        email: testEmail,
        phone: '9876543210',
        password: 'Password@2026',
        role: 'ADMIN', // Client tries to assign ADMIN role
      }),
    });
    const data = await res.json();
    recordResult(
      'Citizen Registration (Enforces USER Role)',
      res.status === 201 && data.role === 'USER',
      `Status: ${res.status}, Enforced Role: ${data.role}`
    );
  } catch (err) {
    recordResult('Citizen Registration (Enforces USER Role)', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Jane',
        email: testEmail,
        phone: '9876543210',
        password: 'Password@2026',
      }),
    });
    recordResult(
      'Prevent Duplicate Email Registration',
      res.status === 409,
      `Status: ${res.status} (Conflict as expected)`
    );
  } catch (err) {
    recordResult('Prevent Duplicate Email Registration', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Short Pass',
        email: `short_${Date.now()}@example.com`,
        phone: '9876543210',
        password: '123',
      }),
    });
    recordResult(
      'Validation: Rejects Password < 8 Chars',
      res.status === 400,
      `Status: ${res.status}`
    );
  } catch (err) {
    recordResult('Validation: Rejects Password < 8 Chars', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'Password@2026' }),
    });
    const data = await res.json();
    newCitizenToken = data.token;
    recordResult(
      'Login with Newly Registered Citizen',
      res.status === 200 && !!newCitizenToken && data.role === 'USER',
      `Status: ${res.status}, Email: ${data.email}`
    );
  } catch (err) {
    recordResult('Login with Newly Registered Citizen', false, err.message);
  }

  // 4. ROLE-BASED AUTHORIZATION & SECURITY
  try {
    const res = await fetch(`${BASE_URL}/users`);
    recordResult(
      'Unauthenticated Access to /api/users Blocked (401)',
      res.status === 401,
      `Status: ${res.status}`
    );
  } catch (err) {
    recordResult('Unauthenticated Access to /api/users Blocked (401)', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    recordResult(
      'User Role Forbidden from /api/users (403)',
      res.status === 403,
      `Status: ${res.status}`
    );
  } catch (err) {
    recordResult('User Role Forbidden from /api/users (403)', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await res.json();
    const passwordsHidden = Array.isArray(data) && data.every((u) => u.password === null);
    recordResult(
      'Admin Authorized on /api/users & Passwords Redacted',
      res.status === 200 && Array.isArray(data) && passwordsHidden,
      `Status: ${res.status}, Users Count: ${data.length}, Passwords Redacted: ${passwordsHidden}`
    );
  } catch (err) {
    recordResult('Admin Authorized on /api/users & Passwords Redacted', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const data = await res.json();
    recordResult(
      'Current User Profile (/api/users/me)',
      res.status === 200 && data.email === 'user@gmail.com' && data.password === null,
      `Status: ${res.status}, Email: ${data.email}, Password Hidden: ${data.password === null}`
    );
  } catch (err) {
    recordResult('Current User Profile (/api/users/me)', false, err.message);
  }

  // 5. COMPLAINT OPERATIONS & ROLE WORKFLOW
  try {
    const res = await fetch(`${BASE_URL}/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newCitizenToken}`,
      },
      body: JSON.stringify({
        issueType: 'Pothole',
        location: '12.9716, 77.5946',
        description: 'Large pothole on main street near market',
        priority: 'High',
        status: 'Pending',
        citizenEmail: testEmail,
        createdAt: new Date().toISOString(),
      }),
    });
    const data = await res.json();
    createdComplaintId = data.id;
    recordResult(
      'Citizen Submits Complaint with Auth Header',
      (res.status === 200 || res.status === 201) && !!createdComplaintId,
      `Status: ${res.status}, Complaint ID: ${createdComplaintId}`
    );
  } catch (err) {
    recordResult('Citizen Submits Complaint with Auth Header', false, err.message);
  }

  // User tries to update status -> Should be 403 Forbidden
  if (createdComplaintId) {
    try {
      const res = await fetch(`${BASE_URL}/complaints/${createdComplaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ status: 'Resolved' }),
      });
      recordResult(
        'Citizen Role Forbidden from Updating Complaint Status (403)',
        res.status === 403,
        `Status: ${res.status}`
      );
    } catch (err) {
      recordResult('Citizen Role Forbidden from Updating Complaint Status (403)', false, err.message);
    }

    // Worker updates status -> Should be 200 OK
    try {
      const res = await fetch(`${BASE_URL}/complaints/${createdComplaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${workerToken}`,
        },
        body: JSON.stringify({
          status: 'In Progress',
          assignedWorker: 'Ramesh',
          resolutionNote: 'Assigned to field team',
        }),
      });
      const data = await res.json();
      recordResult(
        'Worker/Department Updates Complaint Status to In Progress',
        res.status === 200 && data.status === 'In Progress',
        `Status: ${res.status}, New Complaint Status: ${data.status}`
      );
    } catch (err) {
      recordResult('Worker/Department Updates Complaint Status to In Progress', false, err.message);
    }

    // Admin updates status to Resolved -> Should be 200 OK
    try {
      const res = await fetch(`${BASE_URL}/complaints/${createdComplaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          status: 'Resolved',
          resolutionNote: 'Road patched and verified',
        }),
      });
      const data = await res.json();
      recordResult(
        'Admin Updates Complaint Status to Resolved',
        res.status === 200 && data.status === 'Resolved',
        `Status: ${res.status}, New Complaint Status: ${data.status}`
      );
    } catch (err) {
      recordResult('Admin Updates Complaint Status to Resolved', false, err.message);
    }
  }

  // SUMMARY
  console.log('\n====================================================');
  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.filter((r) => !r.passed).length;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passCount} | FAILED: ${failCount}`);
  console.log('====================================================\n');
}

runTests();
