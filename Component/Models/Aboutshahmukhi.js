import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import tw from 'twrnc';
import Screensheader from '../../Screens/Universal//Screensheader';

const Aboutshahmukhi = ({navigation}) => {
    return (
        <SafeAreaView style={[{ backgroundColor: '#FFFFFF' }]}>
            <Screensheader
                name={'Shahmukhi Language'}
                left={10}
                onPress={() => navigation.navigate("Home")}
            />
            <ScrollView vertical showsVerticalScrollIndicator={true}>
                <View style={tw`items-start self-center flex-1`}>
                    <Text style={tw`w-80 text-sm text-start  mt-5`}>
                        <Text style={tw`font-bold  text-xl`}>History and Characteristics of Shahmukhi Script: </Text> {'\n'}

                        Shahmukhi is a script used for writing the Punjabi language, primarily by Punjabi Muslims in Pakistan. It is derived from the Persian script and is a variant of the Urdu script. The name "Shahmukhi" translates to "from the King's mouth," reflecting its association with Persian, the court language of the Mughal Empire. The script has been in use since the 16th century, with its origins linked to the influence of Persian culture and literature in the Indian subcontinent.
                        {'\n'}
                        Shahmukhi's development was significantly influenced by the spread of Islam in Punjab and the subsequent Persianization of the region. The script became prominent during the Mughal period when Persian was the administrative and literary language. As a result, many Persian words and phrases were incorporated into Punjabi, and Shahmukhi emerged as the preferred script for writing Punjabi among Muslims.
                    </Text>
                    <Image
                        style={tw`h-60 w-80`}
                        resizeMode='contain'
                        source={require("../../Images/caliography.jpg")}
                    />
                    <Text style={tw`w-80 text-sm text-start mt-5`}>
                        <Text style={tw`font-bold  text-xl `}>Differences Between Shahmukhi and Gurmukhi  {'\n'}</Text>


                        Shahmukhi and Gurmukhi are the two primary scripts used for writing Punjabi. While they serve the same linguistic purpose, they are distinct in their origins, script structures, and cultural associations.
                        {'\n'}
                        {'\n'}
                        <Text style={tw`font-bold  text-xl `}>1.Origin:{'\n'}</Text>

                        <Text style={tw`font-bold  text-base `}>Shahmukhi{'\n'}</Text>

                        Derived from the Persian script, which in turn is based on the Arabic script. It is used mainly by Punjabi Muslims in Pakistan.
                        {'\n'}
                        <Text style={tw`font-bold  text-base `}>Gurumukhi{'\n'}</Text>
                        Developed by the second Sikh Guru, Guru Angad Dev, in the 16th century. It is used predominantly by Sikhs and Punjabi Hindus in India.
                        {'\n'}

                        {'\n'}
                        {'\n'}
                        <Text style={tw`font-bold  text-xl `}>2.Script Structure:{'\n'}</Text>

                        <Text style={tw`font-bold  text-base `}>Shahmukhi{'\n'}</Text>

                        Written from right to left, like Persian and Urdu. It includes characters for all the sounds in Punjabi, using additional diacritical marks to represent vowel sounds.
                        {'\n'}
                        <Text style={tw`font-bold  text-base `}>Gurumukhi{'\n'}</Text>
                        Written from left to right. It has a more straightforward representation of sounds, with each character corresponding to a specific sound, making it more phonetic than Shahmukhi.
                        {'\n'}


                        {'\n'}
                        {'\n'}
                        <Text style={tw`font-bold  text-xl `}>3.Cultural Associations:{'\n'}</Text>

                        <Text style={tw`font-bold  text-base `}>Shahmukhi{'\n'}</Text>

                        Associated with Islamic culture and Persian literature. It is used in various literary and religious texts within the Muslim community.
                        {'\n'}
                        <Text style={tw`font-bold  text-base `}>Gurumukhi{'\n'}</Text>
                        Closely linked to Sikhism and the teachings of the Sikh Gurus. It is the script of the Guru Granth Sahib, the holy scripture of Sikhism.
                        {'\n'}
                        {'\n'}
                        <Text style={tw`font-bold  text-xl `}>Shahmukhi Khuskhati (Calligraphy)  {'\n'}</Text>


                        Shahmukhi, like other scripts derived from Arabic and Persian, has a rich tradition of calligraphy, known as Khuskhati. This art form is characterized by its elegant and flowing script, often used to create visually stunning pieces of writing. Khuskhati in Shahmukhi emphasizes the aesthetic aspects of writing, with a focus on balance, proportion, and rhythm.
                        {'\n'}
                        The calligraphic tradition in Shahmukhi has been influenced by Persian Nastaliq, which is known for its fluid and cursive style. Shahmukhi calligraphy is not just about writing; it is an artistic expression that blends linguistic and visual elements to create beautiful compositions.
                        {'\n'}

                    </Text>







                    <Text style={tw`w-80 text-sm text-start pb-40 `}>
                        <Text style={tw`font-bold  text-xl `}>{'\n'}Vowels in Shahmukhi</Text>

                        {'\n'}
                        In Shahmukhi, vowels are represented using diacritical marks rather than standalone characters. This system of representing vowels is different from the Gurmukhi script, where vowels have distinct characters. The diacritical marks in Shahmukhi include:

                        {'\n'}
                        Zabar (زبر):
                        {'\n'}
                        Represents the short vowel 'a' as in 'cat'.
                        {'\n'}
                        Zeer (زیر):
                        {'\n'}
                        Represents the short vowel 'i' as in 'sit'.
                        {'\n'}
                        Pesh (پیش):
                        {'\n'}
                        Represents the short vowel 'u' as in 'put'.
                        {'\n'}
                        Alif Maddah (آ):
                        {'\n'}
                        Represents a long vowel 'aa' as in 'father'.
                        {'\n'}
                        Ye Maddah (یٓ):
                        {'\n'}
                        Represents a long vowel 'ee' as in 'see'.
                        {'\n'}
                        Waw Maddah (وٓ):
                        {'\n'}
                        Represents a long vowel 'oo' as in 'moon'.
                        {'\n'}
                        {'\n'}
                        These diacritical marks are placed above or below consonants to indicate the vowel sounds. The use of these marks can sometimes be omitted in casual writing, which requires readers to infer the correct vowel sounds from context.
                        {'\n'}


                        <Text style={tw`font-bold  text-lg `}>{'\n'}Interesting Aspects of Shahmukhi</Text>

                        {'\n'}
                        Phonetic Richness: 
                        {'\n'}
                        Shahmukhi captures the diverse sounds of Punjabi, including aspirated consonants and retroflex sounds, which are integral to the language.
                        {'\n'}
                        Literary Heritage: 
                        {'\n'}
                        Shahmukhi has a rich literary heritage, with numerous classical and contemporary works of Punjabi literature written in this script. This includes poetry, prose, and religious texts.
                        {'\n'}
                        Cultural Significance: 
                        {'\n'}
                        The script is deeply embedded in the cultural fabric of Punjabi Muslims. It is used in everyday communication, literature, and religious practices.
                        {'\n'}
                        Adaptability: 
                        {'\n'}
                        Shahmukhi has adapted over time to include loanwords from Arabic, Persian, and more recently, English. This adaptability ensures its continued relevance in a rapidly changing linguistic landscape.
                        {'\n'}
                        Calligraphic Beauty: 
                        {'\n'}
                        The script's potential for beautiful calligraphy has made it a medium for artistic expression. Shahmukhi calligraphy is admired for its elegance and is used in various decorative and religious contexts.
                        {'\n'}

                      

                        <Text style={tw`font-bold  text-base `}>{'\n'}Conclusion</Text>

                        {'\n'}
                        Shahmukhi is more than just a script; it is a symbol of cultural identity and historical continuity for Punjabi Muslims. Its development and usage reflect the rich tapestry of linguistic, cultural, and religious influences in the region. Despite the challenges posed by the dominance of other scripts and languages, Shahmukhi continues to thrive, supported by its deep cultural roots and adaptability. As we continue to explore and document its nuances, Shahmukhi stands as a testament to the enduring power of language and script in preserving and expressing cultural heritage.
                        {'\n'}

                      
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Aboutshahmukhi