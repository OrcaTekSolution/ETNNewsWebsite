export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Data Deletion Request</h1>

        <p className="mb-4">
          ETN News does not require users to create an account or log in to use
          the app or website. Therefore, we do not store personal account data
          such as usernames, passwords, or profile details.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          How to Request Data Deletion
        </h2>

        <p className="mb-4">
          If you believe any data related to your device, app usage, or
          interaction with ETN News needs to be deleted, you can contact us by
          email.
        </p>

        <div className="bg-gray-100 border rounded-lg p-4 mb-4">
          <p>
            <strong>Email:</strong> orcateksolutions@gmail.com
          </p>
          <p>
            <strong>Subject:</strong> Data Deletion Request - ETN News
          </p>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          What to Include in Your Request
        </h2>

        <p className="mb-4">
          Please include a short description of your request and any information
          that helps us identify the data you want deleted.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Processing Time</h2>

        <p className="mb-4">
          We will review and respond to valid deletion requests within a
          reasonable time.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Data</h2>

        <p className="mb-4">
          Some data may be processed by third-party services such as Google
          AdMob or Meta Audience Network. For data handled by third-party
          services, users may need to manage privacy settings directly through
          those providers.
        </p>

        <p className="text-sm text-gray-600 mt-8">
          Last updated: 25 April 2026
        </p>
      </div>
    </main>
  );
}