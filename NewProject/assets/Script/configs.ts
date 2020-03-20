interface Config {
    server: string;
}

const configs = {
    env: "dev",
    dev: {
        server: "http://192.168.1.4:8888",    // 
    },
    pro: {
        server: "http://lushiyi.cn:9000",
    }
}


export function get_configs(): Config {
    return configs[configs.env];
}