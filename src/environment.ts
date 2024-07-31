class Environment {
    static env = {
        PORT: process.env.PORT || "3000"
    }

    get_environment_variables() {
        return Environment.env;
    }
}

export { Environment };