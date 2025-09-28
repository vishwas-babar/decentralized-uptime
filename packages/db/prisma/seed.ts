import { PrismaClient, WebsiteTickStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
   console.log("🌱 Starting database seeding...");

   // Create user with hashed password
   console.log("👤 Creating user...");
   const hashedPassword = await bcrypt.hash("test@1234", 10);

   const user = await prisma.user.create({
      data: {
         name: "Test User",
         email: "test@gmail.com",
         password: hashedPassword,
      },
   });

   console.log(`✅ Created user: ${user.email}`);
   const userId = user.id;

   // Create validators first
   console.log("📍 Creating validators...");
   const validators = await Promise.all([
      prisma.validator.create({
         data: {
            publicKey: "validator_1_public_key_abc123def456",
            location: "New York, USA",
            ip: "192.168.1.100",
         },
      }),
      prisma.validator.create({
         data: {
            publicKey: "validator_2_public_key_ghi789jkl012",
            location: "London, UK",
            ip: "192.168.1.101",
         },
      }),
      prisma.validator.create({
         data: {
            publicKey: "validator_3_public_key_mno345pqr678",
            location: "Tokyo, Japan",
            ip: "192.168.1.102",
         },
      }),
      prisma.validator.create({
         data: {
            publicKey: "validator_4_public_key_stu901vwx234",
            location: "Singapore",
            ip: "192.168.1.103",
         },
      }),
   ]);

   console.log(`✅ Created ${validators.length} validators`);

   // Create websites
   console.log("🌐 Creating websites...");
   const websites = await Promise.all([
      prisma.website.create({
         data: {
            name: "Google",
            url: "https://google.com",
            checkInterval: 1,
            contactEmail: "admin@example.com",
            userId: userId,
         },
      }),
      prisma.website.create({
         data: {
            name: "GitHub",
            url: "https://github.com",
            checkInterval: 2,
            contactEmail: "admin@example.com",
            userId: userId,
         },
      }),
      prisma.website.create({
         data: {
            name: "Stack Overflow",
            url: "https://stackoverflow.com",
            checkInterval: 5,
            contactEmail: "admin@example.com",
            userId: userId,
         },
      }),
      prisma.website.create({
         data: {
            name: "OpenAI",
            url: "https://openai.com",
            checkInterval: 3,
            contactEmail: "admin@example.com",
            userId: userId,
         },
      }),
      prisma.website.create({
         data: {
            name: "Vercel",
            url: "https://vercel.com",
            checkInterval: 1,
            contactEmail: "admin@example.com",
            userId: userId,
         },
      }),
   ]);

   console.log(`✅ Created ${websites.length} websites`);

   // Create website ticks for the last 30 minutes (simulating real monitoring data)
   console.log("📊 Creating website ticks...");

   const now = new Date();
   const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

   let totalTicks = 0;

   for (const website of websites) {
      console.log(
         `   Creating ticks for ${website.name} (interval: ${website.checkInterval}min)...`
      );

      // Create ticks for each validator for this website
      for (const validator of validators) {
         const ticksData: {
            websiteId: string;
            validatorId: string;
            status: WebsiteTickStatus;
            latency: number;
            createdAt: Date;
         }[] = [];

         // Calculate how many ticks should exist based on check interval
         const tickIntervalMs = website.checkInterval * 60 * 1000; // Convert minutes to milliseconds
         const maxTicks = Math.floor((30 * 60 * 1000) / tickIntervalMs); // How many ticks in 30 minutes

         // Create ticks at the correct intervals
         for (let i = 0; i < maxTicks; i++) {
            const tickTime = new Date(
               thirtyMinutesAgo.getTime() + i * tickIntervalMs
            );

            // Don't create ticks in the future
            if (tickTime > now) break;

            // Simulate realistic uptime patterns
            let status: WebsiteTickStatus;
            let latency: number;

            // Different uptime patterns for different websites
            if (website.name === "Google") {
               // Google: 100% uptime, low latency
               status = WebsiteTickStatus.UP;
               latency = Math.floor(Math.random() * 50) + 20; // 20-70ms
            } else if (website.name === "GitHub") {
               // GitHub: 96.7% uptime
               status =
                  Math.random() > 0.033
                     ? WebsiteTickStatus.UP
                     : WebsiteTickStatus.DOWN;
               latency =
                  status === WebsiteTickStatus.UP
                     ? Math.floor(Math.random() * 100) + 50
                     : 0; // 50-150ms when up
            } else if (website.name === "Stack Overflow") {
               // Stack Overflow: 83.3% uptime (some issues)
               status =
                  Math.random() > 0.167
                     ? WebsiteTickStatus.UP
                     : WebsiteTickStatus.DOWN;
               latency =
                  status === WebsiteTickStatus.UP
                     ? Math.floor(Math.random() * 200) + 100
                     : 0; // 100-300ms when up
            } else if (website.name === "OpenAI") {
               // OpenAI: 93.3% uptime
               status =
                  Math.random() > 0.067
                     ? WebsiteTickStatus.UP
                     : WebsiteTickStatus.DOWN;
               latency =
                  status === WebsiteTickStatus.UP
                     ? Math.floor(Math.random() * 300) + 150
                     : 0; // 150-450ms when up
            } else {
               // Vercel: 100% uptime, fast
               status = WebsiteTickStatus.UP;
               latency = Math.floor(Math.random() * 30) + 10; // 10-40ms
            }

            ticksData.push({
               websiteId: website.id,
               validatorId: validator.id,
               status: status,
               latency: latency,
               createdAt: tickTime,
            });
         }

         // Batch create ticks for this validator-website combination
         if (ticksData.length > 0) {
            await prisma.websiteTick.createMany({
               data: ticksData,
            });
            totalTicks += ticksData.length;
         }
      }
   }

   console.log(`✅ Created ${totalTicks} website ticks`);

   // Create some additional historical ticks for better data visualization
   console.log("📈 Creating additional historical ticks...");

   const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
   let historicalTicks = 0;

   // Create historical ticks for the past 24 hours (respecting check intervals)
   for (const website of websites) {
      for (const validator of validators) {
         const historicalTicksData: {
            websiteId: string;
            validatorId: string;
            status: WebsiteTickStatus;
            latency: number;
            createdAt: Date;
         }[] = [];

         // Calculate how many ticks should exist in 24 hours based on check interval
         // But limit it to keep total ticks per website around 50-100
         const tickIntervalMs = website.checkInterval * 60 * 1000;
         const totalTimeMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
         const thirtyMinTimeMs = 30 * 60 * 1000; // 30 minutes in milliseconds
         const availableTimeMs = totalTimeMs - thirtyMinTimeMs; // Exclude recent 30 minutes
         const theoreticalMaxTicks = Math.floor(
            availableTimeMs / tickIntervalMs
         );

         // Limit historical ticks to around 10-15 per validator to keep total manageable
         // This gives us roughly 40-60 historical + 30-120 recent = 70-180 total ticks per website
         const maxHistoricalTicks = Math.min(15, theoreticalMaxTicks);

         for (let i = 0; i < maxHistoricalTicks; i++) {
            // Spread ticks evenly across the available time period
            const timeSpread = availableTimeMs / maxHistoricalTicks;
            const tickTime = new Date(oneDayAgo.getTime() + i * timeSpread);

            // Skip if this overlaps with our 30-minute recent data
            if (tickTime >= thirtyMinutesAgo) break;

            let status: WebsiteTickStatus;
            let latency: number;

            // Similar patterns but slightly different for historical data
            if (website.name === "Google") {
               status = WebsiteTickStatus.UP;
               latency = Math.floor(Math.random() * 60) + 25;
            } else if (website.name === "GitHub") {
               status =
                  Math.random() > 0.02
                     ? WebsiteTickStatus.UP
                     : WebsiteTickStatus.DOWN;
               latency =
                  status === WebsiteTickStatus.UP
                     ? Math.floor(Math.random() * 120) + 60
                     : 0;
            } else if (website.name === "Stack Overflow") {
               status =
                  Math.random() > 0.05
                     ? WebsiteTickStatus.UP
                     : WebsiteTickStatus.DOWN;
               latency =
                  status === WebsiteTickStatus.UP
                     ? Math.floor(Math.random() * 250) + 120
                     : 0;
            } else if (website.name === "OpenAI") {
               status =
                  Math.random() > 0.03
                     ? WebsiteTickStatus.UP
                     : WebsiteTickStatus.DOWN;
               latency =
                  status === WebsiteTickStatus.UP
                     ? Math.floor(Math.random() * 350) + 180
                     : 0;
            } else {
               status = WebsiteTickStatus.UP;
               latency = Math.floor(Math.random() * 40) + 15;
            }

            historicalTicksData.push({
               websiteId: website.id,
               validatorId: validator.id,
               status: status,
               latency: latency,
               createdAt: tickTime,
            });
         }

         if (historicalTicksData.length > 0) {
            await prisma.websiteTick.createMany({
               data: historicalTicksData,
            });
            historicalTicks += historicalTicksData.length;
         }
      }
   }

   console.log(`✅ Created ${historicalTicks} historical ticks`);

   // Summary
   console.log("\n🎉 Database seeding completed!");
   console.log(`   � User: ${user.email} (password: test@1234)`);
   console.log(`   �📍 Validators: ${validators.length}`);
   console.log(`   🌐 Websites: ${websites.length}`);
   console.log(`   📊 Recent ticks (30min): ${totalTicks}`);
   console.log(`   📈 Historical ticks (24h): ${historicalTicks}`);
   console.log(`   📋 Total ticks: ${totalTicks + historicalTicks}`);
   console.log(`\n💡 Login credentials:`);
   console.log(`   Email: test@gmail.com`);
   console.log(`   Password: test@1234`);
}

main()
   .catch(e => {
      console.error("❌ Error seeding database:", e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
