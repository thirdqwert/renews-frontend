interface INews {
    id: number,
    title: string,
    category: string[]
}

export const revalidate = 180

export default async function Home() {
  const res_login = await fetch("http://127.0.0.1:8000/login/",
    {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: `${process.env.ADMIN_LOGIN}`, password: `${process.env.ADMIN_PASSWORD}`})
    }
  )

  const data_login = await res_login.json()
  const access = data_login.access

  const res = await fetch("http://127.0.0.1:8000/news/",
    {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
        }
    }
  )

  const news = await res.json()
  const news_politics = news.filter((item: INews) => item.category.includes('погода'))




  
  console.log(news_politics)
  return (
    <div>
        <h2>News</h2>
        {news.map(( item: INews )=> (
            <div key={item.id}>
                <h2>{item.id} - {item.title}</h2>
            </div>
        ))}
        <h2>Politcs</h2>
        {news.map(( item: INews )=> (
            <div key={item.id}>
                <h2>{item.id} - {item.title}</h2>
            </div>
        ))}
    </div>
  );
}
