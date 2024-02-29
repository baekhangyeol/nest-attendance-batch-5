echo "Nest 미션 코드 세팅을 시작합니다."

# shellcheck disable=SC2162

echo "사용할 ORM을 선택해주세요."
echo "[1] TypeORM"
echo "[2] Prisma"

read -r orm

if [ "$orm" = "1" ] || [ "$orm" = "TypeORM" ]
then
    echo "TypeORM을 선택하셨습니다."
    echo "TypeORM으로 세팅합니다."
    cp template/package/package.typeorm.json package.json
    cp -r  template/source/typeorm/ src
    cp -r  template/environment/typeorm/ ./
    cp .env.example .env

elif [ "$orm" = "2" ] || [ "$orm" = "Prisma" ]
then
    echo "Prisma를 선택하셨습니다."
    echo "Prisma로 세팅합니다."
    cp template/package/package.prisma.json package.json
    cp -r  template/source/prisma-src/ src
    cp -r  template/environment/prisma/ ./
    cp .env.example .env

else
    echo "잘못된 입력입니다."
fi

echo "사용할 패키지 매니저를 선택해주세요."
echo "[1] npm"
echo "[2] yarn"
echo "[3] pnpm"

read -r packageManager

if [ "$packageManager" = "1" ] || [ "$packageManager" = "npm" ]
then
  echo "npm을 선택하셨습니다."
  echo "npm으로 세팅합니다."
  npm install

  echo "npm 세팅 완료"
elif [ "$packageManager" = "2" ] || [ "$packageManager" = "yarn" ]
then
  echo "yarn을 선택하셨습니다."
  echo "yarn으로 세팅합니다."
  yarn

  echo "yarn 세팅 완료"
elif [ "$packageManager" = "3" ] || [ "$packageManager" = "pnpm" ]
then
  echo "pnpm을 선택하셨습니다."
  echo "pnpm으로 세팅합니다."
  pnpm install

  echo "pnpm 세팅 완료"
else
    echo "잘못된 입력입니다."
fi

rm -rf template
rm -rf .env.example

echo "Nest 미션 레포 세팅이 아래와 같이 완료되었습니다."

if [ "$orm" = "1" ] || [ "$orm" = "TypeORM" ]
then
    echo "ORM: TypeORM"
elif [ "$orm" = "2" ] || [ "$orm" = "Prisma" ]
then
    echo "ORM: Prisma"
fi

if [ "$packageManager" = "1" ] || [ "$packageManager" = "npm" ]
then
    echo "패키지 매니저: npm"
elif [ "$packageManager" = "2" ] || [ "$packageManager" = "yarn" ]
then
    echo "패키지 매니저: yarn"
elif [ "$packageManager" = "3" ] || [ "$packageManager" = "pnpm" ]
then
    echo "패키지 매니저: pnpm"
fi
