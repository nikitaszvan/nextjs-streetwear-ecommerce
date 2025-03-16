export default function BlurredCheckoutForm() {
    return (
        <div className="max-w-2xl" style={{ filter: 'blur(3px)' }}>
            <div className="flex flex-col">
                <div className="space-y-[0.75rem]">
                    <div>
                        <label className="text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="text-sm mt-1 block w-full border text-sm rounded-md shadow-sm border-gray-300 px-4 py-2 text-gray-800 transition-colors placeholder:text-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700">Full name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="text-sm mt-1 block w-full border rounded-md shadow-sm border-gray-300 px-4 py-2 text-gray-800 transition-colors placeholder:text-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700">Country or region</label>
                        <div className="relative mt-1">
                            <select
                                defaultValue="CA"
                                className="block text-sm w-full appearance-none border rounded-md shadow-sm border-gray-300 px-4 py-2 pr-8 text-gray-800 transition-colors focus:border-gray-400 focus:outline-none focus:ring-0"
                            >
                                <option value="CA">Canada</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="AU">Australia</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <svg
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-700">Address</label>
                        <input
                            type="text"
                            defaultValue="123 Address Street"
                            className="text-sm mt-1 block w-full border rounded-md shadow-sm border-gray-300 px-4 py-2 text-gray-800 transition-colors placeholder:text-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {/* Card payment option */}
                        <div className="flex items-center justify-start px-4 py-[0.63rem] border border-primary rounded-md cursor-pointer h-fit">
                            <div className="flex flex-col items-start gap-1">
                                <svg width="16" height="16" className="p-Icon p-Icon--card Icon p-Icon--md p-TabIcon TabIcon p-TabIcon--selected TabIcon--selected" role="presentation" fill="var(--colorIcon)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M0 4a2 2 0 012-2h12a2 2 0 012 2H0zm0 2v6a2 2 0 002 2h12a2 2 0 002-2V6H0zm3 5a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg><span className="text-sm font-medium">Card</span>
                            </div>
                        </div>

                        {/* Klarna payment option */}
                        <div className="flex items-center justify-start px-4 py-2 border border-gray-200 rounded-md cursor-pointer h-fit">
                            <div className="flex flex-col items-start gap-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-Logo p-Logo--md p-TabIcon TabIcon" role="presentation" focusable="false"><g clipPath="url(#clip0_23_1479)"><path d="M0 2.56848C0 1.18777 1.11929 0.0684814 2.5 0.0684814H13.5C14.8807 0.0684814 16 1.18777 16 2.56848V13.5685C16 14.9492 14.8807 16.0685 13.5 16.0685H2.5C1.11929 16.0685 0 14.9492 0 13.5685V2.56848Z" fill="#FFA8CD"></path><path d="M11.5515 2.95847H9.33281C9.33281 4.78346 8.21622 6.41867 6.51959 7.58667L5.85256 8.05387V2.95847H3.54688V13.1785H5.85256V8.11228L9.66634 13.1785H12.4796L8.81077 8.33129C10.4784 7.11949 11.566 5.23606 11.5515 2.95847Z" fill="#0B051D"></path></g><defs><clipPath id="clip0_23_1479"><rect width="16" height="16" fill="white" transform="translate(0 0.0684814)"></rect></clipPath></defs></svg>
                                <span className="text-sm font-medium">Klarna</span>
                            </div>
                        </div>

                        {/* Afterpay payment option */}
                        <div className="flex items-center justify-start px-4 py-2 border border-gray-200 rounded-md cursor-pointer h-fit">
                            <div className="flex flex-col items-start gap-2">
                                <div className="rounded-md flex items-center justify-center text-green-500">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" role="presentation" focusable="false" className="p-Logo p-Logo--md p-TabIcon TabIcon"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z" fill="#B2FCE4"></path><path d="m12.563 5.187-1.477-.845-1.498-.859c-.99-.567-2.228.146-2.228 1.29v.192a.29.29 0 0 0 .15.256l.695.397a.288.288 0 0 0 .431-.252V4.91c0-.226.243-.367.44-.256l1.366.786 1.362.78a.293.293 0 0 1 0 .509l-1.362.781-1.366.786a.294.294 0 0 1-.44-.257v-.226c0-1.144-1.238-1.861-2.228-1.29l-1.494.863-1.478.846a1.49 1.49 0 0 0 0 2.582l1.478.845 1.498.859c.99.567 2.228-.146 2.228-1.29v-.192a.29.29 0 0 0-.15-.256l-.695-.397a.288.288 0 0 0-.431.252v.457a.294.294 0 0 1-.44.256l-1.366-.786-1.362-.78a.293.293 0 0 1 0-.509l1.362-.781 1.366-.786c.197-.11.44.03.44.257v.226c0 1.144 1.238 1.861 2.228 1.289l1.499-.858 1.477-.845c.99-.577.99-2.015-.005-2.587Z" fill="#000"></path></svg>
                                </div>
                                <span className="text-sm font-medium">Afterpay</span>
                            </div>
                        </div>

                        {/* Affirm payment option */}
                        <div className="flex items-center justify-start px-4 py-2 border border-gray-200 rounded-md cursor-pointer h-fit">
                            <div className="flex flex-col items-start gap-2">
                                <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" className="p-Logo p-Logo--md p-TabIcon TabIcon"><path d="M16.8928 16H1.96714C1.58723 16 1.24042 15.7795 1.07315 15.4316C0.287891 13.7983 -0.0767903 11.9879 0.0134624 10.171C0.103715 8.35413 0.645932 6.59061 1.58903 5.04668C2.53214 3.50275 3.84506 2.22926 5.40409 1.3463C6.96312 0.463334 8.71686 0 10.5 0C12.2831 0 14.0369 0.463334 15.5959 1.3463C17.1549 2.22926 18.4679 3.50275 19.411 5.04668C20.3541 6.59061 20.8963 8.35413 20.9865 10.171C21.0768 11.9879 20.7121 13.7983 19.9268 15.4316C19.7596 15.7795 19.4128 16 19.0329 16H16.8928Z" fill="white"></path><path d="M4.12211 14.75C3.36355 13.5916 2.93219 12.2495 2.87372 10.8658C2.81524 9.4822 3.13181 8.10848 3.78992 6.89011C4.44803 5.67174 5.42319 4.65405 6.61216 3.94479C7.80114 3.23552 9.15969 2.86107 10.544 2.86107C11.9283 2.86107 13.2869 3.23552 14.4758 3.94479C15.6648 4.65405 16.64 5.67174 17.2981 6.89011C17.9562 8.10848 18.2728 9.4822 18.2143 10.8658C18.1558 12.2495 17.7245 13.5916 16.9659 14.75H19.1152C19.8292 13.2941 20.1607 11.6804 20.0787 10.0608C19.9966 8.44124 19.5037 6.86926 18.6462 5.49305C17.7888 4.11683 16.5952 2.98173 15.178 2.19473C13.7607 1.40773 12.1664 0.994766 10.5455 0.994766C8.92449 0.994766 7.33023 1.40773 5.91295 2.19473C4.49567 2.98173 3.30207 4.11683 2.44466 5.49305C1.58726 6.86926 1.09429 8.44124 1.01224 10.0608C0.930185 11.6804 1.26174 13.2941 1.97566 14.75H4.12211Z" fill="#4A4AF4"></path><path d="M10.6736 6.01144C9.27565 6.01144 7.66654 6.67138 6.79281 7.36774L7.58936 9.04745C8.2898 8.40645 9.42273 7.85869 10.4435 7.85869C11.4148 7.85869 11.9493 8.1821 11.9493 8.83767C11.9493 9.27471 11.5939 9.52529 10.9226 9.58647C8.40484 9.81811 6.44769 10.6062 6.44769 12.5394C6.44769 14.0735 7.55295 15 9.37176 15C9.91852 15.0007 10.4556 14.8558 10.9278 14.58C11.4 14.3043 11.7903 13.9077 12.0585 13.431V14.7494H14.3272V9.22227C14.3272 6.93944 12.74 6.01727 10.6736 6.01727V6.01144ZM10.011 13.2271C9.28293 13.2271 8.87374 12.9124 8.87374 12.3967C8.87374 11.3186 10.1843 11.0593 11.9027 11.0593C11.9027 12.1869 11.1483 13.2271 10.0096 13.2271H10.011Z" fill="#060809"></path></svg>
                                <span className="text-sm font-medium">Affirm</span>
                            </div>
                        </div>
                    </div>

                    {/* Card details section */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="cardNumber" className="text-sm font-medium">
                                Card number
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="cardNumber"
                                    defaultValue="1234 1234 1234 1234"
                                    className="text-sm w-full h-10 px-3 py-2 pr-12 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate" className="text-sm font-medium">
                                    Expiration date
                                </label>
                                <input
                                    id="expiryDate"
                                    defaultValue="12 / 34"
                                    className="w-full h-10 px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="securityCode" className="text-sm font-medium">
                                    Security code
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="securityCode"
                                        placeholder="CVC"
                                        defaultValue="123"
                                        className="w-full h-10 px-3 py-2 pr-12 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="bg-gray-200 rounded p-1 text-xs">123</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="billing-same"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            readOnly
                            checked
                        />
                        <label htmlFor="billing-same" className="text-sm font-medium">
                            Billing is same as shipping information
                        </label>
                    </div>
                </div>

                <button
                    className="mt-5 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors bg-black text-white shadow-sm hover:bg-black/90 h-10 px-8 w-full rounded-full text-lg"
                    type="button"
                >
                    Pay XXX CAD
                </button>
            </div>
        </div>
    )
};

