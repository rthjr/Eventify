import LoadingPage from "@components/util/Loading"
export default function Loading({ wh }) {
  return <div className='flex justify-center items-center'>
    <div className="min-w-screen w-full min-h-screen flex justify-center items-center">
      <div>
        <LoadingPage wh={wh} />
      </div>
    </div>
  </div>
}