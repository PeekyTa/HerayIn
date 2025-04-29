import { prisma } from "@/lib/prisma"

const FAQ = async () => {
    const faq = await prisma.fAQ.findMany()
    return(
        <>
            <div className="w-full relative p-8 mx-auto">
                {/* Header section */}
                <div className="flex flex-col md:flex-row justify-between mb-12 gap-4">
                    <h1 className="text-5xl md:text-4xl font-semibold mb-6 md:mb-0 text-black 
                                    capitalize">
                    Questions fréquentes
                    </h1>
                    <p className="text-lg text-[#676767] max-w-lg">
                    Vous avez une question ? On a sûrement la réponse.
                    <br />
                    Retrouvez ici les informations les plus demandées à propos de notre
                    plateforme, des ateliers et du rôle des artisans.
                    </p>
                </div>
                
                {/* FAQ  */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Questions */}
                        <div className="space-y-8">
                        {faq.map((faq) => (
                            <h3
                            key={faq.idFAQ}
                            className="text-xl font-medium text-black"
                            >
                            {faq.question}
                            </h3>
                        ))}
                        </div>

                        {/* Réponse */}
                        <div className="space-y-8">
                        {faq.map((faq) => (
                            <p
                            key={faq.idFAQ}
                            className="text-start font-normal text-black"
                            >
                            {faq.reponse}
                            </p>
                        ))}
                        </div>
                    </div>
                </div>
            </>
    )
}
export default FAQ