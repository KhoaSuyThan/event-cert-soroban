#![cfg(test)]

use super::*;
use soroban_sdk::{
    symbol_short,
    testutils::Address as _,
    Address, Env, String,
};

#[test]
fn test_initialize() {
    let env = Env::default();

    let contract_id = env.register(EventCertContract, ());
    let client = EventCertContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);

    env.mock_all_auths();

    client.initialize(&admin);

    let saved_admin = client.get_admin();

    assert_eq!(saved_admin, admin);
}

#[test]
fn test_issue_and_get_certificate() {
    let env = Env::default();

    let contract_id = env.register(EventCertContract, ());
    let client = EventCertContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let student = Address::generate(&env);

    env.mock_all_auths();

    client.initialize(&admin);

    let cert_id = symbol_short!("CERT001");

    client.issue_certificate(
        &admin,
        &cert_id,
        &student,
        &String::from_str(&env, "Nguyen Van A"),
        &String::from_str(&env, "Blockchain Workshop"),
        &String::from_str(&env, "HUTECH IT Club"),
        &String::from_str(&env, "13/06/2026"),
    );

    let certificate = client.get_certificate(&cert_id);

    assert_eq!(certificate.cert_id, cert_id);
    assert_eq!(certificate.student, student);
    assert_eq!(certificate.student_name, String::from_str(&env, "Nguyen Van A"));
    assert_eq!(certificate.event_name, String::from_str(&env, "Blockchain Workshop"));
    assert_eq!(certificate.valid, true);
}

#[test]
fn test_verify_certificate() {
    let env = Env::default();

    let contract_id = env.register(EventCertContract, ());
    let client = EventCertContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let student = Address::generate(&env);

    env.mock_all_auths();

    client.initialize(&admin);

    let cert_id = symbol_short!("CERT002");

    client.issue_certificate(
        &admin,
        &cert_id,
        &student,
        &String::from_str(&env, "Tran Thi B"),
        &String::from_str(&env, "AI Seminar"),
        &String::from_str(&env, "HUTECH"),
        &String::from_str(&env, "14/06/2026"),
    );

    let is_valid = client.verify_certificate(&cert_id);

    assert_eq!(is_valid, true);
}

#[test]
fn test_revoke_certificate() {
    let env = Env::default();

    let contract_id = env.register(EventCertContract, ());
    let client = EventCertContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let student = Address::generate(&env);

    env.mock_all_auths();

    client.initialize(&admin);

    let cert_id = symbol_short!("CERT003");

    client.issue_certificate(
        &admin,
        &cert_id,
        &student,
        &String::from_str(&env, "Le Van C"),
        &String::from_str(&env, "Web3 Event"),
        &String::from_str(&env, "Blockchain Club"),
        &String::from_str(&env, "15/06/2026"),
    );

    client.revoke_certificate(&admin, &cert_id);

    let is_valid = client.verify_certificate(&cert_id);

    assert_eq!(is_valid, false);
}
