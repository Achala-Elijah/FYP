import './list.scss'
import Card from"../card/Card"

function List({posts}){
  return (
    <div className='property-list'>
      <div className="property-list__header">
        <h2 className="property-list__title">Featured Properties</h2>
        <p className="property-list__subtitle">
          Discover your dream property from our curated selection
        </p>
      </div>
      
      <div className="property-list__grid">
        {posts && posts.length > 0 ? (
          posts.map((item, index) => (
            <div 
              key={item.id} 
              className="property-list__item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card item={item}/>
            </div>
          ))
        ) : (
          <div className="property-list__empty">
            <img src="/no-properties.png" alt="No properties" />
            <h3>No Properties Found</h3>
            <p>Try adjusting your search criteria or browse all properties.</p>
          </div>
        )}
      </div>
      
      {/* {posts && posts.length > 0 && (
        <div className="property-list__footer">
          <button className="property-list__load-more">
            Load More Properties
          </button>
        </div>
      )} */}
    </div>
  )
}

export default List