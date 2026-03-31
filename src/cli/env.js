const parseEnv = () => {
    const mitsoVars = Object.entries(process.env)
        .filter(([key]) => key.startsWith('MITSO_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
    
    console.log(mitsoVars);
};

parseEnv();