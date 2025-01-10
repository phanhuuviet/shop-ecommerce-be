import crypto from "crypto"

// Data for signin request
const signinData = {
  email: "phanhuuviet1@gmail.com",
  password: "123456",
}

const HOST = "http://localhost:3030/api"

const EXAMPLE_PAYLOAD = {
  userId: "6741ff1976aba3e9fc0cd4ab",
  price: 330000,
  noteBooking: "",
  room: {
    startDate: "2025-01-06T02:27:00.000Z",
    endDate: "2025-01-07T02:27:00.000Z",
    people: 1,
  },
}

// Step 1: Sign in to get the accessToken
fetch(`${HOST}/signin`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(signinData),
})
  .then((response) => response.json())
  .then((data) => {
    // Extract the accessToken from the response
    const accessToken = data.accessToken

    // If accessToken is available, proceed with the next step
    if (accessToken) {
      const timeHeader = new Date().toISOString() // Current ISO 8601 timestamp
      const payload = EXAMPLE_PAYLOAD

      // Convert payload to Base64
      const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
        "base64"
      )

      // Generate AES-256-CBC key from timeHeader using HMAC-SHA256
      const secretKey = crypto
        .createHmac("sha256", timeHeader)
        .update(timeHeader)
        .digest("hex")
        .slice(0, 32) // Use the first 32 characters (256 bits)

      // Generate a random IV (Initialization Vector)
      const iv = crypto.randomBytes(16)

      // Encrypt the payload using AES-256-CBC
      const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv)
      let encryptedPayload = cipher.update(payloadBase64, "utf-8", "base64")
      encryptedPayload += cipher.final("base64")

      // Combine encrypted payload and IV into the final encodedPayload
      const ivBase64 = iv.toString("base64")
      const encodedPayload = `${encryptedPayload}.${ivBase64}`

      const curlCommand = `curl -X POST ${HOST}/create-order/666745733386016ec6e81bf2 \\
-H "Content-Type: application/json" \\
-H "time: ${timeHeader}" \\
-H "Authorization: Bearer ${accessToken}" \\
-d '{"encodedPayload": "${encodedPayload}"}'`

      console.log("Generated curl command:")
      console.log(curlCommand)
    } else {
      console.error("Access token not found in the response.")
    }
  })
  .catch((error) => {
    console.error("Error signing in:", error.message)
  })
