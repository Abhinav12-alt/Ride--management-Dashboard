// Default admin user
const createDefaultAdmin = async () => {
    try {
        const adminExists = await EmployeeModel.findOne({ email: 'admin@gmail.com' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);

            const admin = new EmployeeModel({
                name: 'Admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            });

            await admin.save();
            console.log("Default admin created successfully");
        } else {
            console.log("Default admin already exists");
        }
    } catch (error) {
        console.error("Error creating default admin:", error);
    }
};

createDefaultAdmin();
