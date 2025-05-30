import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData()

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        <Suspense fallback={<p>Loading...</p>} errorElement={<p>Failed to load posts!</p>}>
          <Await resolve={data.postResponse}>
            {
              (postResponse) => 
                postResponse.data.map(item => 
                  <Card key={item.id} item={item} />
                )
              
            }
          </Await>
        </Suspense>
      </div>
    </div>
    <div className="mapContainer">
    <Suspense fallback={<p>Loading...</p>} errorElement={<p>Failed to load posts!</p>}>
          <Await resolve={data.postResponse}>
            {
              (postResponse) => <Map items={postResponse.data}/>
              
            }
          </Await>
        </Suspense>
      
    </div>
  </div>;
}

export default ListPage;
