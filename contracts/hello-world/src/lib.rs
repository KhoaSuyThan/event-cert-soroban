#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, Address, Env, String, Symbol,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Certificate {
    pub cert_id: Symbol,
    pub student: Address,
    pub student_name: String,
    pub event_name: String,
    pub organizer: String,
    pub issue_date: String,
    pub valid: bool,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    Certificate(Symbol),
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum CertError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    CertificateAlreadyExists = 3,
    CertificateNotFound = 4,
    NotAdmin = 5,
}

#[contract]
pub struct EventCertContract;

#[contractimpl]
impl EventCertContract {
    pub fn initialize(env: Env, admin: Address) -> Result<(), CertError> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(CertError::AlreadyInitialized);
        }

        admin.require_auth();

        env.storage().instance().set(&DataKey::Admin, &admin);

        Ok(())
    }

    pub fn get_admin(env: Env) -> Result<Address, CertError> {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(CertError::NotInitialized)
    }

    pub fn issue_certificate(
        env: Env,
        admin: Address,
        cert_id: Symbol,
        student: Address,
        student_name: String,
        event_name: String,
        organizer: String,
        issue_date: String,
    ) -> Result<(), CertError> {
        Self::check_admin(&env, &admin)?;

        let key = DataKey::Certificate(cert_id.clone());

        if env.storage().persistent().has(&key) {
            return Err(CertError::CertificateAlreadyExists);
        }

        let certificate = Certificate {
            cert_id,
            student,
            student_name,
            event_name,
            organizer,
            issue_date,
            valid: true,
        };

        env.storage().persistent().set(&key, &certificate);

        Ok(())
    }

    pub fn get_certificate(env: Env, cert_id: Symbol) -> Result<Certificate, CertError> {
        let key = DataKey::Certificate(cert_id);

        env.storage()
            .persistent()
            .get(&key)
            .ok_or(CertError::CertificateNotFound)
    }

    pub fn verify_certificate(env: Env, cert_id: Symbol) -> Result<bool, CertError> {
        let certificate = Self::get_certificate(env, cert_id)?;

        Ok(certificate.valid)
    }

    pub fn revoke_certificate(
        env: Env,
        admin: Address,
        cert_id: Symbol,
    ) -> Result<(), CertError> {
        Self::check_admin(&env, &admin)?;

        let key = DataKey::Certificate(cert_id);

        let mut certificate: Certificate = env
            .storage()
            .persistent()
            .get(&key)
            .ok_or(CertError::CertificateNotFound)?;

        certificate.valid = false;

        env.storage().persistent().set(&key, &certificate);

        Ok(())
    }

    fn check_admin(env: &Env, admin: &Address) -> Result<(), CertError> {
        admin.require_auth();

        let saved_admin: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(CertError::NotInitialized)?;

        if saved_admin != *admin {
            return Err(CertError::NotAdmin);
        }

        Ok(())
    }
}

mod test;