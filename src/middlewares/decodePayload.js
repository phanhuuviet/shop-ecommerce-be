const crypto = require("crypto");

const decodePayloadMiddleware = (req, res, next) => {
    try {
        const timeHeader = req.headers["time"];
        if (!timeHeader) {
            return res.status(400).json({ error: "Missing 'time' header." });
        }

        // Validate ISO 8601 format
        const iso8601Regex =
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
        if (!iso8601Regex.test(timeHeader)) {
            return res
                .status(400)
                .json({ error: "'time' header is not in ISO 8601 format." });
        }

        // Use timeHeader as HMAC key
        const secretKey = crypto
            .createHmac("sha256", timeHeader) // timeHeader is used as HMAC key
            .update(timeHeader)
            .digest("hex")
            .slice(0, 32); // Use the first 32 characters (256 bits)

        const { encodedPayload } = req.body;
        if (!encodedPayload) {
            return res
                .status(400)
                .json({ error: "Missing encodedPayload in request body." });
        }

        // Decode the payload
        const [encryptedPayload, ivBase64] = encodedPayload.split(".");
        if (!encryptedPayload || !ivBase64) {
            return res
                .status(400)
                .json({ error: "Invalid encodedPayload format." });
        }

        const iv = Buffer.from(ivBase64, "base64");
        const encryptedData = Buffer.from(encryptedPayload, "base64");

        // Decrypt the payload using AES-256-CBC
        const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
        let decoded = decipher.update(encryptedData, "base64", "utf-8");
        decoded += decipher.final("utf-8");

        const decodedBase64 = Buffer.from(decoded, "base64").toString("utf-8");

        const decodedPayload = JSON.parse(decodedBase64);

        // Replace req.body with the decoded payload
        req.body = decodedPayload;

        next();
    } catch (error) {
        console.error("Error in decodePayloadMiddleware:", error.message);
        res.status(500).json({ error: "Failed to decode payload." });
    }
};

module.exports = {
    decodePayloadMiddleware,
};
