FROM openjdk:8-jdk

ARG JAR_FILE=build/libs/ssafast-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-Duser.timezone=Asia/Seoul","-jar","/app.jar"]