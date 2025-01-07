const crypto = require("crypto");

const encodedResponseMiddleware = (req, res, next) => {
    try {
        // Generate 'time' header for encryption (use current timestamp as a key)
        const timeHeader = new Date().toISOString();
        res.setHeader("time", timeHeader); // Adds `time` to the response headers

        // Store the original `res.json` method
        const originalJson = res.json;

        // Override `res.json` to capture response data
        res.json = function (data) {
            if (data) {
                try {
                    // Convert the response data to Base64 string
                    const responseBase64 = Buffer.from(
                        JSON.stringify(data)
                    ).toString("base64");

                    // Create HMAC SHA-256 key using 'timeHeader'
                    const secretKey = crypto
                        .createHmac("sha256", timeHeader)
                        .update(timeHeader)
                        .digest("hex")
                        .slice(0, 32); // Use the first 32 bytes for AES-256 key

                    // Generate a random Initialization Vector (IV)
                    const iv = crypto.randomBytes(16);

                    // Encrypt the Base64-encoded response using AES-256-CBC
                    const cipher = crypto.createCipheriv(
                        "aes-256-cbc",
                        secretKey,
                        iv
                    );
                    let encryptedResponse = cipher.update(
                        responseBase64,
                        "utf-8",
                        "base64"
                    );
                    encryptedResponse += cipher.final("base64");

                    // Combine encrypted response with IV to form the final encoded response
                    const ivBase64 = iv.toString("base64");
                    const encodedResponse = `${encryptedResponse}.${ivBase64}`;

                    // Call the original `res.json` method to send the encoded response
                    return originalJson.call(res, {
                        encodedResponse,
                    });
                } catch (error) {
                    console.error("Encryption error:", error.message);
                    return originalJson.call(res, {
                        error: "Failed to encode response.",
                    });
                }
            } else {
                // If no body, call the next middleware (though usually you expect a response body)
                return originalJson.call(res, null);
            }
        };

        // Proceed to the next middleware/service
        next();
    } catch (error) {
        console.error("Error in encodeResponseMiddleware:", error.message);
        res.status(500).json({ error: "Failed to encode response." });
    }
};

module.exports = {
    encodedResponseMiddleware,
};
