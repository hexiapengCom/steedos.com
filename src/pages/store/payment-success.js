import React from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CheckIcon } from '@heroicons/react/outline'


export default class PaymentSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home_url: '',
            payment: {},
            open: true
        }
    }
    componentDidMount() {
        if (window?.location?.search) {
            const search = new URLSearchParams(window.location.search);
            if (search.get("result")) {
                this.setState({
                    payment: JSON.parse(decodeURIComponent(escape(window.atob(decodeURIComponent(search.get("result")))))),
                    home_url: window.location.origin,
                    open: true
                })
            }
        }else{
            this.setState({
                home_url: window.location.origin,
                open: true
            })
        }
        
    }

    render() {
        return (
            <>
            {/* <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
                <div className="max-w-3xl mx-auto">
                    <div className="max-w-xl">
                        <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">付款成功!</p>
                        <p className="mt-2 text-base text-gray-500">请在 设置 -> 应用程序 -> 软件包 页面点击<b>同步软件包</b>按钮进行安装.</p>

                        <dl className="mt-12 text-sm font-medium">
                            <dt className="text-gray-900">付款编号</dt>
                            <dd className="text-indigo-600 mt-2">{this.state.payment.name}</dd>
                        </dl>
                    </div>
                </div>
            </main> */}
            <Transition.Root show={this.state.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={()=>{}}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  付款成功
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    请在 设置 -> 应用程序 -> 软件包 页面点击<b>同步软件包</b>按钮进行安装.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <a href="/" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                回到首页
                </a>
                
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
            </>
        )
    }
}