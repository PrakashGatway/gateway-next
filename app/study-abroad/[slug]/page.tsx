import StudyAbroadPage from "@/components/pages/studyAbroad";
import { serverInstance } from "@/services/axiosInstance";

let pageContent;

const getPageContent = async () => {
    try {
        const response = await serverInstance.get('/page/jaipur');
        if (response) {
            pageContent = response.data?.data;
        } else {
            console.log('something went wrong');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
getPageContent();


const StudyAbroad = () => {
    return (
    <StudyAbroadPage content={pageContent} />
    );
};

export default StudyAbroad;