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

function showToast(title, message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function setLoading(buttonId, isLoading) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    if (isLoading) {
        btn.classList.add("loading");
        btn.disabled = true;
    } else {
        btn.classList.remove("loading");
        btn.disabled = false;
    }
}

function showResult(elementId, html, type = "success") {
    const element = document.getElementById(elementId);
    element.className = `result ${type}`;
    element.innerHTML = html;
}

async function verifyCertificate() {
    const certId = document.getElementById("verifyCertId").value.trim();
    
    if (!certId) {
        showToast("Error", "Please enter a certificate ID.", "error");
        return;
    }

    setLoading("verifyBtn", true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200));
    setLoading("verifyBtn", false);

    const certificate = certificates[certId];

    if (!certificate) {
        showToast("Not Found", `No certificate exists with ID: ${certId}`, "error");
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
        showToast("Revoked", `This certificate has been revoked.`, "error");
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

    showToast("Verified", `Certificate ${certId} is valid!`, "success");
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

async function issueCertificate() {
    const certId = document.getElementById("certId").value.trim();
    const studentWallet = document.getElementById("studentWallet").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const eventName = document.getElementById("eventName").value.trim();
    const organizer = document.getElementById("organizer").value.trim();
    const issueDate = document.getElementById("issueDate").value;

    if (!certId || !studentWallet || !studentName || !eventName || !organizer || !issueDate) {
        showToast("Error", "Please fill in all certificate fields.", "error");
        return;
    }

    if (certificates[certId]) {
        showToast("Error", `Certificate ID ${certId} already exists.`, "error");
        return;
    }

    setLoading("issueBtn", true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading("issueBtn", false);

    certificates[certId] = {
        certId,
        studentWallet,
        studentName,
        eventName,
        organizer,
        issueDate,
        valid: true,
    };

    showToast("Success", `Certificate issued successfully.`, "success");
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

async function revokeCertificate() {
    const certId = document.getElementById("revokeCertId").value.trim();

    if (!certId) {
        showToast("Error", "Please enter a certificate ID.", "error");
        return;
    }

    const certificate = certificates[certId];

    if (!certificate) {
        showToast("Error", `Certificate ID ${certId} was not found.`, "error");
        return;
    }

    setLoading("revokeBtn", true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading("revokeBtn", false);

    certificate.valid = false;

    showToast("Success", `Certificate ${certId} revoked.`, "success");
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