This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Typical Next.JS project; here we're just playing with [Prisma](https://www.prisma.io/) transactions API `$.transaction`  
We've scaffolded a nextjs 13 app, and used both server/client components

The Tour: start checking the [prisma schema](prisma/schema.prisma)
Essential we have two individuals willing to exchange "stuff"  
So the way we proceed is listing all "Barters" at: [`src/app/barters/page.tsx`](src/app/barters/page.tsx)  
That will render at route:`http://localhost:3000/barters` after running the `dev` script

On the `/barters` page you will see the list of all the `Barters`, and if you click on  
this will take you to the barters page where all your items/things are listed.

We used a script to seed DB: [`seed.ts`](prisma/seed.ts) and its respective `npm script`

```bash
npm run db:seed
```

A [`db:clear`](prisma/seed.ts) utility is also available

We used [`faker`](https://fakerjs.dev/) package to seed DB; that's why the weird names!

So, the running demos goes like:

1. At your favorites barter page(http://localhost:3000/barters/cldv0idei0020h1b52zvo3rrx) you pick the stuff you like(click).
2. At the "Stuff" detail page, you can go n click "propose exchange"
3. Enter your barterId and the Id for the stuff(yours) that you wanted to change
4. Click the "Send exchange proposal" button and the transaction starts

## Transaction

At client: [`exchange-proposal.tsx`](src/app/stuff/[id]/exchange-proposal.tsx) form we gather up all the information we need  
for api call we used the [`swr`](https://swr.vercel.app/) for `mutation`  
to run the transaction:
We call an api/route: [`api/exchanges/start`](src/pages/api/exchanges/start.ts)  
and from there a `transaction` function or "interactive transaction" that is a function that can cointain  
use code including **Prisma Client** queries, non-Prisma code and other control flow to be executed  
in a transaction, using the `$transaction<R>(fun:(prisma:PrismaClient) => R, options?:object):R`  
you can check that function here: [`start-transaction.ts`](src/utils/transactions/start-transaction.ts)

To ilustrate the process we checked `prisma studio` before/after to verify the creation of
the transaction record:  
before:

<img width=600 src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/jk00e4z.png" />

after:

<img width=600 src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/4y10efb.png" />

\* Also if you keeped track of both the provider item(stuff) Id, and acquirer item(stuff) Id,  
 both of these should be marked as(status) "SELECTED"  
 <img width=600 src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/qa00jwk.png" />  
 <img width=600 src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/m210jf2.png" />

The transaction flow was like commented in the transaction function but as a summary I leave this here

```ts
return await prisma.$transaction(async (tx) => {
  // 1. check provider owns item and item status is other than NOTAVAILABLE
  const providerStuff = await tx.stuff.findFirst({
    where: {
      OR: [
        { id: providerItemId, barterId: providerId, status: "AVAILABLE" },
        { id: providerItemId, barterId: providerId, status: "SELECTED" },
      ],
    },
  });
  // 2. check acquirer owns acquirer item
  const acquirerStuff = await tx.stuff.findFirst({
    where: {
      OR: [
        { id: acquirerItemId, barterId: acquirerId, status: "AVAILABLE" },
        { id: acquirerItemId, barterId: acquirerId, status: "SELECTED" },
      ],
    },
  });
  if (!providerStuff || !acquirerStuff) {
    throw new Error("Exchange cancelled");
  }
  // 4. update provider item with status = SELECTED
  const _updateProviderStuff = await tx.stuff.update({
    where: { id: providerItemId },
    data: { status: "SELECTED" },
  });
  // 5. update  acquirer item with status = SELECTED
  const _updateAcquirerStuff = await tx.stuff.update({
    where: { id: acquirerItemId },
    data: { status: "SELECTED" },
  });
  // 6. create Exchange record
  const newExchange = await tx.exchange.create({
    data: { providerBarterId: providerId, acquirerBarterId: acquirerId, providerItemId, acquirerItemId },
  });
  return newExchange;
});
```

🙌🏼
