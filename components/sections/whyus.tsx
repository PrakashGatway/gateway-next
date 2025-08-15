import { BookOpen, Award, Clock, Laptop } from "lucide-react";

export default function CardLayout() {
    return (
        <section className=" py-8 bg-[#FAFBFF]">
             <div className="text-center mb-10">
                <h2 className="heading text-center d-block mb-2">
                    Why Choose Our Study Platform?
                </h2>
                <p className="sub-heading !text-base max-w-3xl mx-auto">
                    We provide comprehensive support to make your UK education dreams a reality
                    with personalized guidance and expert assistance.
                </p>
            </div>

        <div className="container-sm mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
           
            {/* Left Column */}
            <div className="grid grid-cols-1 gap-6 md:col-span-2">

                {/* Top row - two cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1 */}
                    <div className="bg-white shadow-lg hover:shadow-xl transition-all rounded-2xl p-6 border border-gray-100">
                        <BookOpen className="w-10 h-10 text-red-600 mb-3" />
                        <h3 className="sub-heading mb-2">Expert Instructors</h3>
                        <p className="text-gray-800 text-base">
                            Learn directly from seasoned professionals who bring real-world
                            experience into the classroom, ensuring you gain practical skills
                            that are in demand.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-lg hover:shadow-xl transition-all rounded-2xl p-6 border border-gray-100">
                        <Award className="w-10 h-10 text-red-600 mb-3" />
                        <h3 className="sub-heading mb-2">Industry Certification</h3>
                        <p className="text-gray-800 text-base">
                            Receive globally recognized certificates that boost your career
                            opportunities and validate your skills to employers worldwide.
                        </p>
                    </div>
                </div>

                {/* Bottom row - full width card */}
                <div className="bg-white shadow-lg hover:shadow-xl transition-all rounded-2xl p-6 border border-gray-100">
                    <Laptop className="w-10 h-10 text-red-600 mb-3" />
                    <h3 className="sub-heading mb-2">100+ Career-Boosting Courses</h3>
                    <p className="text-gray-800 text-base">
                        Access our growing library of over 100 courses across web
                        development, data science, design, and business. Updated regularly
                        to keep you ahead in your field.
                    </p>
                </div>
            </div>

            {/* Right Column - single tall card */}
            <div className="bg-[#FBE7EA] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                <div>
                    <Clock className="w-10 h-10 text-[#DC2626] mb-3" />
                    <h3 className="sub-heading !text-[#D71635] font-bold mb-2">Flexible Learning Schedules</h3>
                    <p className="text-[#1F2937] text-base">
                        Whether you prefer to study in the early mornings or late nights,
                        our flexible online platform allows you to learn at your own pace,
                        anywhere in the world. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptate ipsa incidunt eum labore assumenda minus nesciunt et ut. Facere similique velit molestias quas iste dolorem, ducimus mollitia ut amet?
                    </p>
                </div>
                <button className="mt-6 btn-primary border border-white py-2 px-4">
                    Start Your Journey →
                </button>
            </div>
        </div>
        </section>

    );
}
