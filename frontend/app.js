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

function formatDateToVietnamese(dateStr) {
    if (!dateStr) return "";
    let parts = dateStr.includes('-') ? dateStr.split('-') : dateStr.split('/');
    if (parts.length === 3) {
        if (dateStr.includes('-')) {
            return `${parts[2]} tháng ${parts[1]} năm ${parts[0]}`; // yyyy-mm-dd
        } else {
            return `${parts[0]} tháng ${parts[1]} năm ${parts[2]}`; // dd/mm/yyyy
        }
    }
    return dateStr;
}

function generateCertificateHTML(cert) {
    const formattedDate = formatDateToVietnamese(cert.issueDate);
    // Use the wallet address or a part of it as MSSV for mockup purposes
    const mssv = cert.studentWallet.length > 10 ? cert.studentWallet.substring(0, 10) : cert.studentWallet;
    
    return `
    <div style="display: flex; justify-content: center; margin-top: 20px; padding-bottom: 20px;">
        <div class="cert-frame notranslate" translate="no" style="zoom: 0.85; -moz-transform: scale(0.85); -moz-transform-origin: top center;">
            <div class="cert-border-outer">
                <div class="cert-border-inner">
                    <div class="cert-bg-pattern"></div>
                    
                    <div class="cert-logo-placeholder">
                        <img src="logo.png" alt="HUTECH Logo" style="height: 60px; object-fit: contain;">
                    </div>

                    <div class="real-dept">KHOA CÔNG NGHỆ THÔNG TIN</div>
                    <div class="real-trao">Trao</div>
                    <div class="real-title">Giấy chứng nhận</div>
                    <div class="real-name">${cert.studentName}</div>
                    <div class="real-mssv">MSSV: ${mssv}</div>
                    <div class="real-reason">Đã tham gia chương trình</div>
                    <div class="real-event">${cert.eventName}</div>

                    <div class="real-footer">
                        <div class="real-cert-id">Số: ${cert.certId}</div>
                        <div class="real-signature">
                            <div class="real-date">TP. Hồ Chí Minh, ngày ${formattedDate}</div>
                            <div class="real-role">P. TRƯỞNG KHOA</div>
                            <div class="signature-line">
                                <span style="font-family: 'Brush Script MT', cursive; font-size: 36px; color: #000080; opacity: 0.8; line-height: 0.5;">Duong Thanh Phet</span>
                            </div>
                            <div class="real-signer">Th.S Dương Thành Phết</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
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
        <div style="text-align: center; color: #4ade80; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span class="pulse"></span> CHỨNG NHẬN HỢP LỆ TRÊN BLOCKCHAIN
        </div>
        ${generateCertificateHTML(certificate)}
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