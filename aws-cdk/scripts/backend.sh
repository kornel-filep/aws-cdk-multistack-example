yum install -y amazon-linux-extras

amazon-linux-extras install java-openjdk11

java -version

wget -O app.jar https://example-jar-backend.s3.eu-north-1.amazonaws.com/NAME_OF_JAR_TO_DEPLOY.jar

chown ec2-user app.jar

java -jar app.jar