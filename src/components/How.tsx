const posts = [
  {
    id: 1,
    title: "Register as a company or professionist",
    description:
      "Start by creating an account depending on your needs: Are you a company? Or are you a professionist? Provide your basic information for your profile: name, email, location, etc. Depending on your account type you may need to provide additional information such as your company's name, size, etc.",
    imageUrl: "images/numberone.png",
  },
  {
    id: 2,
    title: "Connect your wallet",
    description:
      "The platform requires you to connect your wallet to be able to receive certifications (or send in case its a company account). It is important for you to keep in mind that the necessary security steps must be follower to protect your data and digital assets.",
    imageUrl: "/images/numbertwo.png",
  },
  {
    id: 3,
    title: "Enjoy a professional validation platform  ",
    description:
      "Once you have completed the first two steps, you will be able to access the curriculum validation platform we have created for you. In it you can present your work experience, which will be validated by your company. This will avoid having to go through multiple interviews and selection processes ins earch of employment. If you are a company, you will be able to access a vast database of qualified candidates and quickly validate their credentials. In short, the platform will validate and speed up the personnel selection process.",
    imageUrl: "/images/numberthree.png",
  },
];

export default function How() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2
            id="How"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center"
          >
            How does it work?
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 text-center">
            Follow these easy steps:
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {posts.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-32 lg:shrink-0">
                  <img
                    src={post.imageUrl}
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {post.title}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
