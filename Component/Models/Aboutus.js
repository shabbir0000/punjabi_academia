import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import tw from 'twrnc';
import Screensheader from '../../Screens/Universal//Screensheader';

const Aboutus = () => {
    return (
        <SafeAreaView style={[{ backgroundColor: '#FFFFFF' }]}>
            <Screensheader
                name={'Who Are We'}
                left={20}
                onPress={() => navigation.navigate("Home")}
            />
            <ScrollView vertical showsVerticalScrollIndicator={true}>
                <View style={tw`items-start self-center flex-1`}>
                    <Text style={tw`w-80 text-sm text-start  mt-5`}>

                        We would like to begin by expressing our heartfelt gratitude to our FYP coordinator, Sir Irfan Ali Khandharo. His unwavering support, guidance, and encouragement have been instrumental in the successful completion of our project. Without his mentorship, our journey would not have been as enriching and fulfilling.
                        {'\n'}
                        {'\n'}
                        <Text style={tw`font-bold  text-xl`}>About Us: </Text> {'\n'}
                        Our journey began a year ago, with a shared vision and a common goal among the three of us—Abdul Moiz, Muhammad Saif, and myself, Muhammad Shabbir. As students of Computer Science at SMIU University, we embarked on this research project with immense enthusiasm but zero data. The road ahead was uncertain, filled with numerous challenges and learning opportunities, but we were determined to make a significant contribution to the field of language processing and machine learning.
                    </Text>

                    <Text style={tw`w-80 text-sm text-start mt-5 pb-20`}>


                        <Text style={tw`font-bold  text-xl `}>The Beginning  {'\n'}</Text>

                        Our initial phase was marked by an intensive data collection process. With no existing datasets available for our specific requirements, we had to start from scratch. We began by identifying reliable sources from which we could scrape data. This involved countless hours of searching, validating, and gathering raw data from various online repositories, books, articles, and other textual resources. The process was arduous and time-consuming, but it was a crucial first step towards our goal.
                        {'\n'}
                        {'\n'}

                        <Text style={tw`font-bold  text-xl `}>Writing and Submitting Research Papers  {'\n'}</Text>

                        Throughout our project, we documented our findings and methodologies meticulously. With the invaluable guidance of Sir Irfan Ali Khandharo, we authored several research papers detailing our processes, challenges, and the outcomes of our work. Writing these papers was an integral part of our learning experience, as it required us to critically analyze our work and present it coherently.
                        {'\n'}
                        {'\n'}
                        We submitted our research papers to various international journals with the hope of sharing our work with the global research community. The submission process was rigorous, involving multiple rounds of reviews and revisions, but it was immensely rewarding. It provided us with the opportunity to contribute to the broader field of language processing and machine learning, and to receive valuable feedback from experts around the world.
                        {'\n'}
                        {'\n'}

                        <Text style={tw`font-bold  text-xl `}>Team Effort and Collaboration:{'\n'}</Text>

                        <Text style={tw`font-bold  text-base `}>Abdul Moiz:{'\n'}</Text>

                        His expertise in data science and machine learning algorithms was invaluable. He played a crucial role in the model development and evaluation phases, ensuring that our models were both robust and efficient.
                        {'\n'}
                        <Text style={tw`font-bold  text-base `}>Muhammad Saif{'\n'}</Text>
                        With a strong background in software development and programming, Saif was instrumental in writing and optimizing the preprocessing scripts. His attention to detail and problem-solving skills helped us overcome numerous technical challenges
                        {'\n'}
                        {'\n'}

                        <Text style={tw`font-bold  text-base `}>Muhammad Shabbir{'\n'}</Text>
                        He contributed to both the data preprocessing and model training phases, ensuring seamless integration and coordination among the various components of our project. His focus was on maintaining the overall project direction and ensuring that we adhered to our timeline and goals.

                        {'\n'}
                        {'\n'}

                        <Text style={tw`font-bold  text-xl `}>Overcoming Challenges{'\n'}</Text>


                        Our journey was not without hurdles. We faced numerous challenges, from technical issues and data quality concerns to time constraints and resource limitations. However, our determination and collaborative spirit helped us overcome these obstacles. We learned to adapt, innovate, and persevere, gaining valuable insights and experiences along the way.
                        {'\n'}
                        {'\n'}
                        <Text style={tw`font-bold  text-xl `}>Completion and Development{'\n'}</Text>
                        After a year of hard work, dedication, and countless hours of research and development, we successfully completed our project. The outcome is a comprehensive and well-documented dataset, along with a set of trained machine learning models that can be used for further research and practical applications in language processing. Furthermore, our research papers, now submitted to international journals, represent our contribution to the global research community.

                        Our project has not only contributed to our academic growth but also equipped us with practical skills and knowledge that will be invaluable in our future careers. We are proud of what we have achieved and are grateful for the support and encouragement from our university, faculty, and peers.

                        {'\n'}
                        {'\n'}

                        <Text style={tw`font-bold  text-xl `}>Conclusion{'\n'}</Text>
                        In conclusion, our journey over the past year has been both challenging and rewarding. We have grown as individuals and as a team, developing a deeper understanding of the complexities and nuances of language processing and machine learning. We are thankful to Sir Irfan Ali Khandharo for his guidance and to SMIU University for providing us with the opportunity to embark on this transformative journey.

                        As we move forward, we are excited about the possibilities and opportunities that lie ahead. We hope that our work will inspire and benefit future students and researchers, contributing to the advancement of knowledge and technology in this field. Thank you for being a part of our journey.
                        {'\n'}
                        {'\n'}


                    </Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Aboutus