import { DeployWebHookAttributesType } from 'zero-wallet-wagmi-connector';

export interface GasTankType {
    gas_tank_id: string;
    project_id: string;
    created_at: string;
    name: string;
    chain_id: string;
    provider_url: string;
    funding_key: string;
    whitelist: string[];
}

export interface NewGasTank extends IBase {
    name: string;
    chain_id: string;
    provider_url: string;
    whitelist: string[];
}

export interface ProjectType {
    project_id: string;
    project_api_key: string;
    name: string;
    created_at: string;
    owner_scw: string;
    allowed_origins: string[];
}

export interface IBase {
    ownerScw: string;
    webHookAttributes: DeployWebHookAttributesType;
}

export interface NewProject extends IBase {
    name: string;
    allowedOrigins: string[];
}
