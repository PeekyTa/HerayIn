import ContactDetails from "@/app/components/contact/contactDetails"
import ContactForm from "@/app/components/contact/contactForm"
import FAQ from "../components/contact/faq"


const Contact = async() => {
    return(
        <div>
             <div className="h-[400px]">
                {/* hero section */}
             </div>

            <div className="flex flex-col md:flex-row gap-20 mb-10">
                <div className="w-full md:w-2/3">
                    <ContactForm/>
                </div>

                <div className="w-full md:w-1/3 lg:w-[33%]">
                    <ContactDetails/>
                </div>
            </div>

            <br />

            <div className="w-full">
                <FAQ/>
            </div>
            
        </div>
    )
}
export default Contact