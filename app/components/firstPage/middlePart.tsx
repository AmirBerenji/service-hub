import { useTranslations } from 'next-intl';
import React from 'react'

export default function MiddlePart() {
    const t = useTranslations("MiddlePart");
  return (
     <section className="max-w-4xl mx-auto mt-20 bg-[#f7efe6] rounded-3xl px-8 py-12 flex flex-col sm:flex-row justify-between text-center sm:text-left space-y-10 sm:space-y-0 sm:space-x-10 relative">
        <div className="sm:border-r border-[#d9d9d9] sm:pr-10">
          <h2 className="text-4xl font-bold text-[#7ea6b9] mb-2">
            <i className="fas fa-magnifying-glass"></i>
          </h2>
          <h3 className="font-semibold text-gray-700 mb-2">
             {t('FirstPart.title')}
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">
            {t('FirstPart.body')}
          </p>
        </div>
        <div className="sm:border-r border-[#d9d9d9] sm:px-10">
          <h2 className="text-4xl font-bold text-[#7ea6b9] mb-2">
            <i className="fas fa-check-circle"></i>
          </h2>
          <h3 className="font-semibold text-gray-700 mb-2">
            {t('SecondPart.title')}
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">
          {t('SecondPart.body')}
           </p>
        </div>
        <div className="sm:pl-10">
          <h2 className="text-4xl font-bold text-[#7ea6b9] mb-2">
            <i className="fas fa-calendar-check"></i>
          </h2>
          <h3 className="font-semibold text-gray-700 mb-2">
            {t('ThiredPart.title')}
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">
           {t('ThiredPart.body')}
            </p>
        </div>
      </section>
  )
}
