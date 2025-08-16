"use client"
import React, { useState } from "react"
import { Input, Text } from "rizzui";
import { Button } from "rizzui";
import { Box } from "@mui/material"
import { Search, Plus, ChevronUp, Minus, ChevronDown } from "lucide-react"
import CustomTooltip from "@/components/custom-tooltip/custom-tooltip";
import Image from "next/image"

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedQuestion, setExpandedQuestion] = useState("what-is-smutt")
  const [isFaqOpen, setIsFaqOpen] = useState(true)

  const toggleQuestion = (id: string) => {
    setExpandedQuestion((prev) => (prev === id ? "" : id))
  }

  const faqCards = [
    { id: "signup", title: "What is sign up?", content: "$MUTT is the native utility token of the Mutt Army community." },
    { id: "buy", title: "What is Buy $SMUTT?", content: "$SMUTT is the native utility token of the Mutt Army community." },
    { id: "stack", title: "What is Stake $SMUTT?", content: "$SMUTT is the native utility token of the Mutt Army community." },
    { id: "again-signup", title: "What is sign up?", content: "$SMUTT is the native utility token of the Mutt Army community." },
  ]

  const faqQuestions = [
    {
      id: "what-is-smutt",
      question: "What is $SMUTT and how do I use it?",
      answer:
        "$MUTT is the native utility token of the Mutt Army community. It's used for various purposes within our ecosystem, such as rewarding meme contest winners, potentially for future community features, and for accessing exclusive content or voting rights. You can typically acquire $MUTT on decentralized exchanges (DEXs) where it's listed. To use it, you'll need a compatible cryptocurrency wallet and follow the specific instructions for each platform or feature that utilizes $MUTT...",
    },
    {
      id: "where-buy",
      question: "Where can I buy $SMUTT?",
      answer:
        "$SMUTT can be purchased on various decentralized exchanges. Always verify you're buying the authentic token...",
    },
    {
      id: "ranks",
      question: "How do ranks work?",
      answer:
        "Ranks in the Mutt Army community are determined by your level of participation, $SMUTT holdings, and contribution...",
    },
    {
      id: "staking",
      question: "What are the staking rewards?",
      answer:
        "Staking $SMUTT provides rewards including passive income, voting rights, and access to exclusive features...",
    },
  ]

  return (
    <>
      <div className="p-4 relative">
        <Image src='/money-mutt/lgshadow.svg'  alt="ShadowImage" className='absolute -top-20
        -left-48 z-[999] hidden dark:block' width={550} height={550} />
        
        <Text className="text-2xl py-2 font-semibold text-gray-800 dark:text-gray-800">Help Center</Text>
        <Text className="text-gray-800 pb-4 dark:text-gray-800 font-normal text-sm">
          Learn how to buy $Mutt, stake, vote, and get the most out of your journey in the Money Mutt ecosystem.
        </Text>
        <div className="flex flex-col md:flex-row">
          <Box className="text-black w-full dark:text-white">
            <Box className="bg-lightgray-primary dark:bg-greenPrimary-secodarydark text-black rounded-xl p-6 mb-6 dark:text-white">
              <h1 className="text-xl font-semibold text-center mb-6 text-black dark:text-white">
                How can we help you today?
              </h1>

              <Box className="max-w-full md:max-w-2xl mx-auto flex flex-col sm:flex-row mb-6 gap-4 dark:bg-greenPrimary-secodarydark">
                <Input
                  placeholder="Enter your search term here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  prefix={<Search className="w-4 h-4 text-gray-400 dark:text-gray-600" />}
                  className="h-10 w-full border-none rounded text-sm font-semibold"
                  inputClassName=" border-white dark:border-greenPrimary-300 dark:text-gray-800  rounded"
                />
                <Button
                  variant="solid"
                  className="!px-7 flex text-sm items-center justify-center text-white dark:!text-gray-950 font-medium !bg-greenPrimary-600 active:bg-yellow-500 rounded-md focus:outline-none focus:ring-0"
                >
                  Search
                </Button>
              </Box>

              <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-5">
                {faqCards.map((card) => (
                  <Box
                    key={card.id}
                    className="bg-white p-4 rounded-md hover:bg-gray-100 transition-colors dark:bg-[#092522]"
                  >
                    <Text className="text-lg font-semibold text-black dark:text-white">{card.title}</Text>
                    <br />
                    <Text className="text-sm text-gray-700 font-normal dark:text-white">{card.content}</Text>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="bg-lightgray-primary rounded-lg w-full dark:bg-greenPrimary-secodarydark text-black dark:text-white mb-4">
              <Box
                className="flex items-center justify-between cursor-pointer dark:bg-greenPrimary-200 bg-white p-6 rounded-t-lg"
                onClick={() => setIsFaqOpen(!isFaqOpen)}
              >
                <h2 className="text-xl font-semibold">FAQ</h2>
                {isFaqOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </Box>

              {isFaqOpen &&
                faqQuestions.map((item) => (
                  <Box key={item.id} className="border-t dark:border-greenPrimary-300 border-white p-6">
                    <Box
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleQuestion(item.id)}
                    >
                      <Text className="text-lg font-semibold px-2">{item.question}</Text>
                      {expandedQuestion === item.id ? <Minus size={20} /> : <Plus size={20} />}
                    </Box>
                    {expandedQuestion === item.id && (
                      <Text className="text-gray-600 mt-2 text-sm font-normal dark:text-white px-2">{item.answer}</Text>
                    )}
                  </Box>
                ))}
            </Box>

            <div className="mb-10 bg-lightgray-primary border dark:border-greenPrimary-300 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 mt-3 dark:bg-[#092522]">
              <h2 className="text-xl font-semibold text-black dark:text-white">Onboarding Tour</h2>

              <CustomTooltip
                content={
                  <>
                    <div className="p-3">
                      Launch a step-by-step guide <br />
                      through the MoneyMutt dashboard.
                    </div>
                  </>
                }
                position="top-right"
              >
                <Button
                  variant="solid"
                  className="!bg-greenPrimary-600 font-medium text-sm !text-white items-center px-4 py-2 rounded-lg"
                >
                  Start Tour
                </Button>
              </CustomTooltip>
            </div>
          </Box>
        </div>
      </div>
    </>
  )
}

export default Faq