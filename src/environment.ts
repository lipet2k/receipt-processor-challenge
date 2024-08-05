class Environment {
    static env: { [PORT: string]: string } = {
        PORT: process.env.PORT || '3000'
    }

    get environment_variables(): { [PORT: string]: string } {
        return Environment.env;
    }
}

export { Environment };