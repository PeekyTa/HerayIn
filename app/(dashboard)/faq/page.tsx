import Faqcreation from "@/app/components/faq/faqcreation"
import FAQTable from "@/app/components/faq/faqtable"
import { prisma } from "@/lib/prisma"
const FAQPage = async ()=>  {
  const faqs = await prisma.fAQ.findMany()

  return (
    <div>
        <Faqcreation/>
        <FAQTable faqs={faqs}/>
    </div>
  )
}

export default FAQPage
