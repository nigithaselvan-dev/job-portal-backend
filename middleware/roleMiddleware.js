const authorizeRoles = (...roles) => {
    return (req, res, next) => {
console.log("USER FROM TOKEN:", req.user);
        console.log("ALLOWED ROLES:", roles);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};

module.exports = {
    authorizeRoles
};