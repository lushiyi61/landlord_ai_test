interface Config {
    server: string;
}

const configs = {
    env: "dev",
    dev: {
        server: "http://192.168.187.136:8000",    // 
    },
    pro: {
        server: "http://lushiyi.cn:9000",
    }
}


export function get_configs(): Config {
    return configs[configs.env];
}