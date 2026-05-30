"use client";

import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import dynamic from "next/dynamic";
import { ConfessionFeed } from "./components/confession/ConfessionFeed";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./components/ui/card";

const EnhancedConfessionForm = dynamic(
  () =>
    import("./components/confession/EnhancedConfessionForm").then((mod) => ({
      default: mod.EnhancedConfessionForm,
    })),
  {
    loading: () => (
      <div className="animate-pulse bg-zinc-900 rounded-xl p-6 h-48">
        <div className="h-4 bg-zinc-800 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-zinc-800 rounded mb-4"></div>
        <div className="h-10 bg-zinc-800 rounded w-24"></div>
      </div>
    ),
    ssr: false,
  },
);
import Header from "./components/layout/Header";

export default function Home() {
  return (
    <>
      <OnboardingFlow />

      <main className="p-4 md:p-8 flex flex-col items-center space-y-6">
        <Card className="confession-feed w-full max-w-xl bg-white dark:bg-zinc-900 border-zinc-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center text-zinc-900 dark:text-zinc-100">
              Confession Feed
            </CardTitle>
            <CardDescription className="text-center">
              Browse anonymous confessions from the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button className="create-confession-button">Post Confession</Button>
            <div className="reaction-buttons flex gap-4">
              <Button variant="outline" size="sm">
                👍 Like
              </Button>
              <Button variant="outline" size="sm">
                ❤️ Love
              </Button>
            </div>
          </CardContent>
        </Card>

        <section
          className="wallet-connect w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          aria-label="Wallet privacy information"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Connect wallet
              </p>
              <p>
                We only show a shortened wallet address in the app. Transactions
                you sign on Stellar may still be visible on the public chain.
              </p>
            </div>
            <Button variant="ghost">Connect Wallet</Button>
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            xConfess will never ask you to paste private wallet recovery details.
          </p>
        </section>

        <ErrorBoundary>
          <Header />

          <div className="container mx-auto py-8 px-4">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold">Confessions</h1>
              <p>Share your secrets anonymously</p>
            </header>

            <div className="mb-12 max-w-3xl mx-auto">
              <EnhancedConfessionForm />
            </div>

            <div className="max-w-3xl mx-auto">
              <ConfessionFeed />
            </div>
          </div>
        </ErrorBoundary>
      </main>
    </>
  );
}
