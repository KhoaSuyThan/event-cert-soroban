const certificates = {
    CERT001: {
        certId: "CERT001",
        studentWallet: "GABC...STUDENT",
        studentName: "Nguyen Van A",
        eventName: "Blockchain Workshop",
        organizer: "HUTECH IT Club",
        issueDate: "13/06/2026",
        valid: true,
    },
};

function showResult(elementId, html, type = "success") {
    const element = document.getElementById(elementId);

    element.className = `result ${type}`;
    element.innerHTML = html;
}

function verifyCertificate() {
    const certId = document.getElementById("verifyCertId").value.trim();

    if (!certId) {
        showResult(
            "verifyResult",
            "<strong>Error:</strong> Please enter a certificate ID.",
            "error"
        );
        return;
    }

    const certificate = certificates[certId];

    if (!certificate) {
        showResult(
            "verifyResult",
            `
            <strong>Certificate Not Found</strong>
            <p>No certificate exists with ID: ${certId}</p>
            `,
            "error"
        );
        return;
    }

    if (!certificate.valid) {
        showResult(
            "verifyResult",
            `
            <strong>Certificate Revoked</strong>
            <p>This certificate exists but is no longer valid.</p>
            <p><strong>Certificate ID:</strong> ${certificate.certId}</p>
            `,
            "error"
        );
        return;
    }

    showResult(
        "verifyResult",
        `
        <strong>Certificate Valid</strong>
        <p><strong>Certificate ID:</strong> ${certificate.certId}</p>
        <p><strong>Student:</strong> ${certificate.studentName}</p>
        <p><strong>Student Wallet:</strong> ${certificate.studentWallet}</p>
        <p><strong>Event:</strong> ${certificate.eventName}</p>
        <p><strong>Organizer:</strong> ${certificate.organizer}</p>
        <p><strong>Issue Date:</strong> ${certificate.issueDate}</p>
        <p><strong>Status:</strong> Valid</p>
        `,
        "success"
    );
}

function issueCertificate() {
    const certId = document.getElementById("certId").value.trim();
    const studentWallet = document.getElementById("studentWallet").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const eventName = document.getElementById("eventName").value.trim();
    const organizer = document.getElementById("organizer").value.trim();
    const issueDate = document.getElementById("issueDate").value;

    if (!certId || !studentWallet || !studentName || !eventName || !organizer || !issueDate) {
        showResult(
            "issueResult",
            "<strong>Error:</strong> Please fill in all certificate fields.",
            "error"
        );
        return;
    }

    if (certificates[certId]) {
        showResult(
            "issueResult",
            `<strong>Error:</strong> Certificate ID ${certId} already exists.`,
            "error"
        );
        return;
    }

    certificates[certId] = {
        certId,
        studentWallet,
        studentName,
        eventName,
        organizer,
        issueDate,
        valid: true,
    };

    showResult(
        "issueResult",
        `
        <strong>Certificate Issued Successfully</strong>
        <p><strong>Certificate ID:</strong> ${certId}</p>
        <p><strong>Student:</strong> ${studentName}</p>
        <p><strong>Event:</strong> ${eventName}</p>
        `,
        "success"
    );

    document.getElementById("certId").value = "";
    document.getElementById("studentWallet").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("eventName").value = "";
    document.getElementById("organizer").value = "";
    document.getElementById("issueDate").value = "";
}

function revokeCertificate() {
    const certId = document.getElementById("revokeCertId").value.trim();

    if (!certId) {
        showResult(
            "revokeResult",
            "<strong>Error:</strong> Please enter a certificate ID.",
            "error"
        );
        return;
    }

    const certificate = certificates[certId];

    if (!certificate) {
        showResult(
            "revokeResult",
            `<strong>Error:</strong> Certificate ID ${certId} was not found.`,
            "error"
        );
        return;
    }

    certificate.valid = false;

    showResult(
        "revokeResult",
        `
        <strong>Certificate Revoked</strong>
        <p>Certificate ID ${certId} is now marked as invalid.</p>
        `,
        "success"
    );

    document.getElementById("revokeCertId").value = "";
}