import { Button } from "@/components/ui/button";
import BackArrow from "@/svg/back-arrow"
import { poolModal } from "@/type/type";
import Image from "next/image";

function CreatePoolModal({modalHandle,sendFn}:poolModal){
    return (
      <div className="relative">
        <div
          className="fixed h-screen w-full bg-[#868686]/20 backdrop-blur-md top-0 left-0"
          onClick={modalHandle}
        />
        <div className="w-4/5 max-h-[500px] mmin-h-[467px]  z-50 h-fit bg-[#1E1E1E] top-1/2 right-1/2 fixed -translate-y-[50%] translate-x-[50%] rounded-lg border border-[#fff] py-6 px-4">
          <div
            className=" border-b border-[#373737] flex items-center p-2 gap-2 mb-5"
            onClick={modalHandle}
          >
            <BackArrow />
            <span>Go back</span>
          </div>
          <div className="flex justify-between gap-7 border border-[#373737] p-2 rounded-sm">
            <div className="w-[420px] h-[344px] relative border">
              <Image src="" alt="pool-image" fill />
            </div>
            <div>
              <h2 className="text-2xl font-work font-semibold">
                PredFi to win the hackathon
              </h2>
              <div className="flex">
                <div className="grid gap-10 w-1/2">
                  <div>
                    <h3>Description</h3>
                    <h3>
                      You can now put your prediction into something and get
                      outcomes
                    </h3>
                  </div>
                  <div>
                    <h3>
                      Start Time: <span>01 - 03 - 2025</span>
                    </h3>
                    <h3>
                      Lock Time: <span>01 - 03 - 2025</span>
                    </h3>
                    <h3>
                      End Time: <span>01 - 03 - 2025</span>
                    </h3>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-2 grid-cols-2">
                      <Button className="rounded-full">
                        Yes: PredFi to win
                      </Button>
                      <Button className="rounded-full">&10</Button>
                    </div>
                    <Button className="w-full rounded-full">Commit</Button>
                  </div>
                </div>
                <div className="w-1/2 grid place-content-end self-start gap-16">
                  <div>
                    <h3>Event URL</h3>
                    <h3>https://earn.superteam.fun/all/</h3>
                  </div>
                  <div>
                    <h3>Total Amount in Pool</h3>
                    <h3>$10,000</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="button"
            className="justify-self-end my-2 "
            onClick={sendFn}
          >
            create pool
          </Button>
        </div>
      </div>
    );
}
export default CreatePoolModal