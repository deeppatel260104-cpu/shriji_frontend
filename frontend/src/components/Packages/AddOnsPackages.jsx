import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddOnPackages } from '../../actions/addOnPackageAction';

const AddOnsPackages = () => {
  const dispatch = useDispatch();
  const { addOns } = useSelector((state) => state.addOnPackagesReducer);

  useEffect(() => {
    dispatch(getAllAddOnPackages());
  }, [dispatch]);

  return (
    <section className="py-24 bg-ink/5 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl mb-4 italic">Tailor Your Memories</h2>
            <p className="text-ink-light font-light">Customizable add-ons to perfectly fit your wedding needs.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, i) => (
              <div key={addon.id || i} className="bg-white p-6 rounded-xl flex items-center justify-between border border-black/5 hover:border-gold/30 transition-colors group cursor-default">
                <div className="flex items-center gap-4">
                  <span className="font-jost text-sm font-medium text-ink">{addon.name}</span>
                </div>
                <span className="text-xs font-cinzel text-teal">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default AddOnsPackages
