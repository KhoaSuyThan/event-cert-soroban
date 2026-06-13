# EventCert Stellar

## Project Title

EventCert Stellar

## Project Description

EventCert Stellar is a decentralized smart contract project built on Soroban, the smart contract platform of the Stellar blockchain. The project provides a simple and transparent way to issue, manage, verify, and revoke event participation certificates on-chain.

Instead of using paper certificates or editable PDF files, each certificate is recorded on the blockchain with a unique certificate ID. This allows students, participants, organizers, and employers to verify whether a certificate is authentic and still valid.

## Project Vision

The vision of EventCert Stellar is to create a trustworthy digital certificate system for schools, clubs, organizations, and event organizers. By using blockchain technology, the system reduces certificate forgery, improves transparency, and makes verification faster and more reliable.

This project aims to help participants prove their event attendance, while allowing employers or third parties to verify certificates without depending on a centralized database.

## Key Features

* **Admin Initialization:** The contract allows an admin wallet to be initialized for managing certificates.
* **Certificate Issuing:** Admins can issue event participation certificates to users.
* **Unique Certificate ID:** Each certificate has a unique ID to prevent duplication.
* **Certificate Verification:** Anyone can verify whether a certificate exists and is still valid.
* **Certificate Revocation:** Admins can revoke certificates if they are issued incorrectly or become invalid.
* **On-chain Storage:** Certificate data is stored on-chain using Soroban persistent storage.
* **Access Control:** Only the admin can issue or revoke certificates.
* **Transparent Validation:** Users, employers, and third parties can check certificate validity publicly.

## Usage Instructions

1. **Initialize Admin:** Deploy the contract and initialize the admin wallet.
2. **Issue Certificate:** Admin creates a certificate by entering certificate ID, student wallet, student name, event name, organizer, and issue date.
3. **Get Certificate:** Users can query certificate information by certificate ID.
4. **Verify Certificate:** Anyone can check whether a certificate is valid.
5. **Revoke Certificate:** Admin can revoke a certificate if needed.
6. **Query Public Data:** Certificate details and status can be viewed for verification purposes.

## Contract Functions

| Function             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `initialize`         | Initializes the admin wallet of the contract      |
| `get_admin`          | Returns the current admin address                 |
| `issue_certificate`  | Issues a new certificate to a participant         |
| `get_certificate`    | Returns certificate information by certificate ID |
| `verify_certificate` | Checks whether a certificate is valid             |
| `revoke_certificate` | Revokes an existing certificate                   |

## Certificate Data Structure

Each certificate contains the following information:

| Field          | Description                             |
| -------------- | --------------------------------------- |
| `cert_id`      | Unique certificate ID                   |
| `student`      | Wallet address of the certificate owner |
| `student_name` | Name of the participant                 |
| `event_name`   | Name of the event                       |
| `organizer`    | Name of the organizer                   |
| `issue_date`   | Date when the certificate was issued    |
| `valid`        | Certificate status: valid or revoked    |

## Example Use Case

A university club organizes a blockchain workshop. After the event, the admin issues digital certificates to all participants through the smart contract.

Each participant receives a certificate linked to their Stellar wallet. Later, when the participant adds the certificate to a CV or portfolio, an employer can verify the certificate by checking its certificate ID on the blockchain.

## Future Scope

* **NFT Certificate Support:** Represent each certificate as a unique NFT-like asset.
* **QR Code Verification:** Generate QR codes for quick certificate checking.
* **Web Interface:** Build a user dashboard for admins and participants.
* **PDF Certificate Export:** Allow participants to download certificates as PDF files.
* **Multiple Organizations:** Support multiple admins or organizations.
* **Event Management:** Add event creation and event-based certificate grouping.
* **Metadata Storage:** Store certificate metadata using IPFS or decentralized storage.
* **Wallet Login:** Allow users to connect their Stellar wallet for certificate management.

## Technology Stack

* **Rust** for smart contract development.
* **Soroban SDK** for building Stellar smart contracts.
* **Stellar Blockchain** for decentralized and immutable certificate records.
* **Soroban Studio** for writing, testing, and deploying the contract.

## Project Structure

```txt
contracts/
└── hello-world/
    ├── src/
    │   ├── lib.rs
    │   └── test.rs
    │
    ├── Cargo.toml
    └── Makefile

Cargo.toml
README.md
```

## Smart Contract Overview

The smart contract stores the admin address and certificate records. The admin is responsible for issuing and revoking certificates. Each certificate is stored using a unique certificate ID.

The contract uses access control to make sure that only the admin can perform sensitive actions such as issuing or revoking certificates.

## Contribution

Community contributions are welcome. Developers can improve the project by adding new certificate features, building a frontend interface, integrating wallet connection, or improving verification methods.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.

## Contract Detail

ID: `CCDNWQMDXQBNBKI65H6MZH4VM7XVDWTEOQJWOKBZPYUITUXBCAZX7QNM`

![Contract Screenshot](image.png)
