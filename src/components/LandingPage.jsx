import React from "react";
import dubaiImage from "../assets/dubai-hero.jpg"; // Replace with actual image path
import mcqImage from "../assets/mcq.jpg"; // Replace with actual image path

const LandingPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="position-relative text-center text-white" style={{ background: `url(${dubaiImage}) no-repeat center/cover`, height: "80vh" }}>
                <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-dark bg-opacity-50">
                    <h1 className="display-3 fw-bold">Ultimate Guide for Your Dubai Journey</h1>
                    <p className="lead mt-3 w-75">Master your tests with 1400+ MCQs and detailed explanations!</p>
                    <button className="btn btn-warning btn-lg mt-3">Get Access Now</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="container text-center my-5">
                <h2 className="fw-bold mb-4">Why Choose Us?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <i className="bi bi-file-earmark-text h1 text-primary"></i>
                        <h4 className="fw-semibold mt-2">1400+ MCQs</h4>
                        <p>Access a well-structured question bank covering all important topics.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-check-circle h1 text-success"></i>
                        <h4 className="fw-semibold mt-2">100% Exam-Oriented</h4>
                        <p>Designed specifically to help you clear your Dubai exams with ease.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-shield-lock h1 text-danger"></i>
                        <h4 className="fw-semibold mt-2">Strict Security</h4>
                        <p>No screenshots allowed. Any violations will result in account termination.</p>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2 className="fw-bold">About Our Platform</h2>
                    <p className="lead mt-3">We provide an exclusive, high-quality question bank designed for professionals and students aiming to pass Dubai-based exams effortlessly.</p>
                    <img src={mcqImage} alt="MCQs" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "80%" }} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-5">
                <h2 className="fw-bold">Get Your Login Credentials Now!</h2>
                <p className="lead">Contact us and start practicing today.</p>
                <button className="btn btn-success btn-lg">Request Access</button>
            </section>

            {/* FAQ Section */}
            <section className="container my-5">
                <h2 className="fw-bold text-center">Frequently Asked Questions</h2>
                <div className="accordion mt-4" id="faqAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                How do I get login credentials?
                            </button>
                        </h2>
                        <div id="faq1" className="accordion-collapse collapse show">
                            <div className="accordion-body">Contact our support team, and we'll provide you with access.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                Can I take screenshots?
                            </button>
                        </h2>
                        <div id="faq2" className="accordion-collapse collapse">
                            <div className="accordion-body text-danger fw-bold">No! Screenshotting leads to immediate account termination.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                How long is my account valid?
                            </button>
                        </h2>
                        <div id="faq3" className="accordion-collapse collapse">
                            <div className="accordion-body">Each account is valid for 20 days from the date of activation.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-4 bg-dark text-white">
                <p>© {new Date().getFullYear()} Dubai MCQ Portal. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
