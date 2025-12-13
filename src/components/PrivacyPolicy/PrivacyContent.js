import "./PrivacyContent.css";

const PrivacyContent = () => {
    return (
        <div className="privacy">
            <div className="privacy-title">
                <h1>Privacy Policy</h1>
                <p>Last updated: December 2025</p>
            </div>

            <div className="privacy-section">
                <h3>1. Introduction</h3>
                <p>
                    At <strong>Daniyaal Perfumery</strong>, we value your privacy and are committed
                    to protecting your personal information. This Privacy Policy explains how we
                    collect, use, store, and safeguard your data when you visit our website
                    (https://www.daniyaalperfumery.in/) or make a purchase from us.
                </p>
            </div>

            <div className="privacy-section">
                <h3>2. Information We Collect</h3>
                <p>We collect the following types of data when you interact with our website:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email, phone number, billing/shipping address.</li>
                    <li><strong>Payment Details:</strong> Collected securely by our payment partners (e.g., Razorpay). We do not store card details.</li>
                    <li><strong>Order Information:</strong> Products you purchase and your transaction history.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, analytics data.</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h3>3. How We Use Your Information</h3>
                <ul>
                    <li>To process and deliver your orders.</li>
                    <li>To improve website performance and user experience.</li>
                    <li>To communicate order updates, offers, and support-related messages.</li>
                    <li>To ensure secure payment processing.</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h3>4. How We Protect Your Data</h3>
                <p>
                    We implement strict security measures, including encryption and secure server
                    infrastructure, to safeguard your personal information. Our payment partners
                    are PCI-DSS compliant and ensure secure transaction processing.
                </p>
            </div>

            <div className="privacy-section">
                <h3>5. Sharing of Your Information</h3>
                <p>We do not sell your personal information. However, we may share data with:</p>
                <ul>
                    <li>Trusted service providers (shipping, payment gateways, analytics).</li>
                    <li>Authorities if required for legal compliance.</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h3>6. Cookies & Tracking Technologies</h3>
                <p>
                    We use cookies to improve browsing experience, analyze traffic, and personalize content.
                    You can disable cookies through your browser settings.
                </p>
            </div>

            <div className="privacy-section">
                <h3>7. Your Rights</h3>
                <p>You may request to:</p>
                <ul>
                    <li>Access your personal information.</li>
                    <li>Update or correct inaccurate data.</li>
                    <li>Request deletion of your data (where possible).</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h3>8. Third-Party Services</h3>
                <p>
                    Our website may contain links to third-party platforms. We are not responsible
                    for their privacy practices and encourage you to review their Privacy Policies.
                </p>
            </div>

            <div className="privacy-section">
                <h3>9. Updates to This Policy</h3>
                <p>
                    We may update this Privacy Policy periodically. Any changes will be posted on
                    this page with an updated revision date.
                </p>
            </div>

            <div className="privacy-section">
                <h3>10. Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, feel free to contact us:
                </p>
                <p><strong>Email:</strong> daniyaalperfumery@gmail.com</p>
                <p><strong>Phone:</strong> +91 75429 44441</p>
            </div>
        </div>
    );
};

export default PrivacyContent;
