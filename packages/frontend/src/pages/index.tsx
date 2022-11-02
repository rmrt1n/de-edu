import { CenterBody } from '@components/layout/CenterBody'
import { Lock__factory } from '@ethathon/contracts/typechain-types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/social/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import sc from 'public/images/sc.webp'
import toast from 'react-hot-toast'
import tw from 'twin.macro'
import { useSigner } from 'wagmi'

import { Button } from '@components/Button'

const OldButton = tw.button`m-2 px-2 py-1 rounded-lg border border-current text-gray-400 font-semibold hover:(text-white)`

const HomePage: NextPage = () => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()

  const getOwner = async () => {
    if (!signer || !contracts) return
    const contract = Lock__factory.connect(contracts.Lock.address, signer)
    try {
      const owner = await contract.owner()
      toast.success(owner)
      console.log({ owner })
    } catch (e) {
      toast.error('Error while fetching owner. Try again…')
      console.error(e)
    }
  }

  const withdraw = async () => {
    if (!signer || !contracts) return
    const contract = Lock__factory.connect(contracts.Lock.address, signer)
    try {
      const tsx = await contract.withdraw({ gasLimit: 50000 })
      const receipt = await tsx.wait()
      toast.success('Successfully withdrawn!')
      console.log({ receipt })
    } catch (e: any) {
      toast.error('Error while withdrawal. Try again…')
      console.error(e)
    }
  }

  return (
    <div tw="max-w-4xl m-auto">
      {/* hero */}
      <section tw="px-4 py-8 flex justify-between text-lg">
        <div tw="max-w-xl space-y-4">
          <h1 tw="text-4xl font-bold font-heading">Short tagline for the project</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <div tw="space-x-4">
            <Button type="primary">Start Learning</Button>
            <Button type="secondary">Create Course</Button>
          </div>
        </div>
        <div tw="hidden md:block w-80 h-64 bg-gray-200" />
      </section>

      <section tw="px-4 py-8 text-lg">
        <div tw="flex justify-between items-end mb-4">
          <h2 tw="text-3xl font-bold font-heading">Explore Courses</h2>
          <Link href="/course">
            <a tw="text-lg">See all</a>
          </Link>
        </div>
        <div tw="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((course) => (
            <div tw="border rounded-lg shadow-md" key={course}>
              <div tw="w-full h-36 relative">
                <Image src={sc} alt="course thumbnail" layout="fill" tw="rounded-lg" />
              </div>
              <div tw="p-4 flex flex-col gap-4">
                <p tw="text-base font-medium font-heading">Build a web3 app with solidity</p>
                <p>
                  A 2-week project where you will learn some Solidity, write + deploy a smart
                  contract to the blockchain, and...
                </p>
                <Button type="tertiary">Start Learning</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section tw="px-4 py-8 text-lg space-y-4">
        <h2 tw="text-3xl font-bold font-heading">Create Your Own Courses</h2>
        <p tw="max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Button type="primary">Start Creating</Button>
        <div tw="w-full h-80 bg-gray-200" />
      </section>

      <CenterBody>
        <p>I&apos;m leaving this below for reference</p>
        {/* Title */}
        <div tw="flex flex-col items-center text-center">
          <Link href="https://github.com/ethathon/ethathon" passHref>
            <a target="_blank" tw="mb-2 opacity-50 cursor-pointer hover:opacity-100">
              <Image src={githubIcon} priority width={42} height={42} alt="Github Logo" />
            </a>
          </Link>
          <h1 tw="text-3xl font-bold tracking-tight">ETHathon</h1>
          <p tw="text-gray-400 mt-1">Smart Contract & DApp Development Boilerplate</p>
          <a tw="mt-4" href="https://github.com/ethathon/ethathon#deployment">
            <Image src={vercelIcon} priority width={92} height={32} alt="Deploy with Vercel" />
          </a>
          <div tw="w-14 h-[2px] bg-gray-800 my-14" />
        </div>

        {/* Rainbowkit Connect Button */}
        <ConnectButton />

        {/* Lock.sol Contract Interactions */}
        {signer && (
          <div tw="mt-6 flex items-center">
            <div tw="text-gray-400 mr-2">Lock.sol:</div>
            <OldButton onClick={() => getOwner()}>Get Owner</OldButton>
            <OldButton onClick={() => withdraw()}>Withdraw</OldButton>
          </div>
        )}
      </CenterBody>
    </div>
  )
}

export default HomePage
