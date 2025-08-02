import { createContext, useContext, useState, useEffect } from 'react';
import PageServices from '@/services/PageServices'; // adjust path

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [user, setUser] = useState(null);
    const [globalData, setGlobalData] = useState({
        aboutPage: null,
        homePage: null,
        course: null,
        testimonials: null,
        youtubeVideo: null,
        studentSlider: null,
        studentHome: null,
        teamMembers: null,
        careerPage: null,
        jobFormData: null,
        contactPage: null,
        contactSettings: null,
        faqData: null,
        photoGallery: null,
        courseSlider: null,
        spokenEnglish: null,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const [
                    aboutPage,
                    homePage,
                    course,
                    testimonials,
                    youtubeVideo,
                    studentSlider,
                    studentHome,
                    teamMembers,
                    careerPage,
                    jobFormData,
                    contactPage,
                    contactSettings,
                    faqData,
                    photoGallery,
                    courseSlider,
                    spokenEnglish,
                ] = await Promise.all([
                    PageServices.getAboutPageById().then(res => res?.data || null).catch(() => null),
                    PageServices.getHomePageDetails().then(res => res?.data || null).catch(() => null),
                    PageServices.getCourse().then(res => res?.data || null).catch(() => null),
                    PageServices.getTestimonial().then(res => res?.data || null).catch(() => null),
                    PageServices.getYoutubeVideo().then(res => res?.data || null).catch(() => null),
                    PageServices.getStudentSlider().then(res => res?.data || null).catch(() => null),
                    PageServices.getStudentHome().then(res => res?.data || null).catch(() => null),
                    PageServices.getMember().then(res => res?.data || null).catch(() => null),
                    PageServices.getCareerPageById().then(res => res?.data || null).catch(() => null),
                    PageServices.getJobData().then(res => res?.data || null).catch(() => null),
                    PageServices.getContactPageById().then(res => res?.data || null).catch(() => null),
                    PageServices.getSettingData().then(res => res?.data || null).catch(() => null),
                    PageServices.getOffice().then(res => res?.data || null).catch(() => null),
                    PageServices.getPhoto().then(res => res?.data || null).catch(() => null),
                    PageServices.getStudent().then(res => res?.data || null).catch(() => null),
                    PageServices.getSpokenEnglishDetails().then(res => res?.data || null).catch(() => null),
                ]);

                setGlobalData({
                    aboutPage,
                    homePage,
                    course,
                    testimonials,
                    youtubeVideo,
                    studentSlider,
                    studentHome,
                    teamMembers,
                    careerPage,
                    jobFormData,
                    contactPage,
                    contactSettings,
                    faqData,
                    photoGallery,
                    courseSlider,
                    spokenEnglish,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <GlobalContext.Provider
            value={{
                user,
                login,
                logout,
                ...globalData,
                loading,
                error,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}