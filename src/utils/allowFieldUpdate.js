// Define the allowed fields for update
const allowedFields = [
    "name",
    "address",
    "avatar",
    "dateOfBirth",
    "gender",
    "phone",
];

const checkDisallowedFields = (updateFields) => {
    return Object.keys(updateFields).filter(
        (field) => !allowedFields.includes(field)
    );
};

module.exports = checkDisallowedFields;
