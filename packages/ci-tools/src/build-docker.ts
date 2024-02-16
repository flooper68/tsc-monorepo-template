import { execSync } from 'node:child_process'

function prepareFinalDistFolder(finalFolderName: string) {
  console.log(`Preparing final ${finalFolderName} folder...`)
  execSync(`rm -rf ${finalFolderName} && mkdir ${finalFolderName}`, {
    stdio: 'inherit'
  })
  console.log('Prepared!')
}

function includeRootPackageJson(finalFolderName: string) {
  console.log('Including package.json...')
  execSync(`cp ../../package.json ./${finalFolderName}/package.json`, {
    stdio: 'inherit'
  })
  console.log('Added!')
}

function includeLockFile(finalFolderName: string) {
  console.log('Including lock file...')
  execSync(`cp ../../pnpm-lock.yaml ./${finalFolderName}/pnpm-lock.yaml`, {
    stdio: 'inherit'
  })
  console.log('Added!')
}

function includeWorkspaceDefinition(finalFolderName: string) {
  console.log('Including workspace definition file...')
  execSync(`cp ../../pnpm-workspace.yaml ./${finalFolderName}/pnpm-workspace.yaml`, {
    stdio: 'inherit'
  })
  console.log('Added!')
}

function preparePackageFolders(finalFolderName: string) {
  console.log('Preparing package folders...')
  execSync(
    `cd ../../ && find ./packages/ -type d -maxdepth 1 -exec mkdir ./packages/ci-tools/${finalFolderName}/{} ';'`,
    {
      stdio: 'inherit'
    }
  )
  console.log('Done!')
}

function copyPackagesContent(finalFolderName: string) {
  console.log('Copying over content of packages...')
  execSync(
    `cd ../../ && find ./packages -name 'package.json' -maxdepth 2 -exec cp '{}' ./packages/ci-tools/${finalFolderName}/{} ';'`,
    {
      stdio: 'inherit'
    }
  )
  execSync(
    `cd ../../ && find ./packages \\( -iname 'dist' -a -not -path './packages/ci-tools/${finalFolderName}' \\) -type d -maxdepth 2 -exec cp -r '{}' ./packages/ci-tools/${finalFolderName}/{} ';'`,
    {
      stdio: 'inherit'
    }
  )
  console.log('Done!')
}

function cleanUpUnnecessaryPackages(includedPackages: string[], finalFolderName: string) {
  const allPackages = execSync(' cd ../../ &&  echo $(find ./packages -maxdepth 1 -type d  -exec basename {} \\;)', {
    encoding: 'utf-8'
  })
    .trim()
    .split(' ')

  const foldersToDelete = allPackages.filter(x => !includedPackages.includes(x))

  for (const folder of foldersToDelete) {
    console.log(`Cleaning up ${folder}...`)
    execSync(`rm -rf ./${finalFolderName}/packages/${folder}`, {
      stdio: 'inherit'
    })
    console.log('Done!')
  }
}

function copyPublicFolder(finalFolderName: string) {
  console.log('Moving over the client build to server static folder...')

  //mkdir
  execSync(`mkdir -p ./${finalFolderName}/packages/server-api/public`, {
    stdio: 'inherit'
  })

  execSync(`cp -a ../../packages/client/dist/* ./${finalFolderName}/packages/server-api/public`, {
    stdio: 'inherit'
  })
  console.log('Moved over!')
}

function buildDockerImage(props: { image: string; tag: string }) {
  const { image, tag } = props

  const taggedImage = `${image}:${tag}`

  console.log(`Building docker image ${taggedImage}...`)

  execSync(`DOCKER_BUILDKIT=1 docker build -t ${taggedImage} -t local-build -f ./Dockerfile .`, {
    stdio: 'inherit'
  })

  console.log('Done!')
}

function prepareDist(includedPackages: string[], finalFolderName: string) {
  /**
   * Here we assume all packages are already built and we just need to copy them over
   */
  prepareFinalDistFolder(finalFolderName)
  includeRootPackageJson(finalFolderName)
  includeLockFile(finalFolderName)
  includeWorkspaceDefinition(finalFolderName)
  preparePackageFolders(finalFolderName)
  copyPackagesContent(finalFolderName)
  cleanUpUnnecessaryPackages(includedPackages, finalFolderName)
  copyPublicFolder(finalFolderName)
}

const serverPackages = ['db-context', 'server-feature', 'server-api', 'shared-trpc']

function run() {
  prepareDist(serverPackages, 'showcase-dist')
  buildDockerImage({ image: 'showcase', tag: 'latest' })
}

run()
